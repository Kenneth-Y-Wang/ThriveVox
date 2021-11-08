const fetch = require('node-fetch');
require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

// for sign-in and sign-up

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, email, location } = req.body;
  if (!username || !password || !email || !location) {
    throw new ClientError(400, 'username, password, email and location are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword","email","userLocation")
        values ($1, $2, $3, $4)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword, email, location];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "email",
           "userLocation"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword, email, userLocation } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username, email, userLocation };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);

          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

// for userinfo and image getting when showing home

app.get('/api/profile/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    return;
  }
  const sql = `
    select "avaterUrl",
           "avaterCaption",
           "userStyle",
           "userSkills",
           "userInstruments",
           "userPrimaryInterest",
           "userInterest",
           "userBand",
           "userBio"
      from "users"
     where "userId" = $1
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const [userInfo] = result.rows;

      res.json(userInfo);
    })
    .catch(err => next(err));
});

// for favorite search
app.get('/api/favorite/search', (req, res, next) => {

  const { 'fetch-path': fetchPath, 'file-name': fileName } = req.headers;

  fetch(fetchPath, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'theaudiodb.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data[fileName]) {
        const [result] = data[fileName];

        res.json(result);
      }
    })
    .catch(err => next(err));
});
// moving forward using token to verify userId

app.use(authorizationMiddleware);

// for updating userInfo
app.patch('/api/profile/users', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return;
  }

  const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = req.body;

  let avaterUrl;
  if (req.file) {
    avaterUrl = `/images/${req.file.filename}`;
  }
  const sql = `
  update "users"
     set "avaterCaption"=$1,
         "userStyle"=$2,
         "userSkills"=$3,
         "userInstruments"=$4,
         "userPrimaryInterest"=$5,
         "userInterest"=$6,
         "userBand"=$7,
         "userBio"=$8,
        "avaterUrl" = coalesce($9,"avaterUrl")
  where  "userId"=$10
  returning "avaterUrl","avaterCaption","userStyle","userSkills","userInstruments","userPrimaryInterest","userInterest","userBand","userBio"
  `;

  const params = [avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio, avaterUrl, userId];
  db.query(sql, params)
    .then(result => {
      const [userUpdatedInfo] = result.rows;

      res.json(userUpdatedInfo);
    })
    .catch(err => next(err));
});

// user save favorite

app.post('/api/favorite/savedFavorite', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return;
  }
  let type;
  if (req.body.idAlbum) {
    type = 'album';
  } else {
    type = 'artist';
  }
  const favoriteDetail = req.body;
  const sql = `
    insert into "savedFavorite" ("userId","favoriteType","favoriteDetails")
    values ($1, $2, $3)
    returning*
  `;
  const params = [userId, type, favoriteDetail];
  db.query(sql, params)
    .then(result => {
      const [favoriteSaved] = result.rows;
      res.json(favoriteSaved);
    })
    .catch(err => next(err));
});

// carousel get data

app.get('/api/favorite/savedFavorite', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return;
  }
  const sql = `
  select "userId",
         "favoriteId",
         "favoriteType",
         "favoriteDetails"
    from "savedFavorite"
    where "userId"=$1
    order by "favoriteId" desc
    limit 5
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const savedFavorite = result.rows;
      res.json(savedFavorite);
    })
    .catch(err => next(err));
});

// home get saved data

app.get('/api/favorite/allSavedFavorites', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return;
  }
  const sql = `
  select "userId",
         "favoriteId",
         "favoriteType",
         "favoriteDetails"
    from "savedFavorite"
    where "userId"=$1
    order by "favoriteId" desc
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const savedFavorite = result.rows;
      res.json(savedFavorite);
    })
    .catch(err => next(err));
});

// user delete favorite

app.delete('/api/favorite/allSavedFavorites/:favoriteId', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return;
  }
  const favoriteId = Number(req.params.favoriteId);

  const sql = `
    delete from "savedFavorite"
     where "favoriteId" = $1
     returning *
    `;
  const value = [favoriteId];

  db.query(sql, value)
    .then(result => {
      const favorite = result.rows[0];
      if (!favorite) {

        throw new ClientError(400, `cannot find content with favoriteId ${favoriteId}`);
      } else {

        res.sendStatus(204);
      }
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
