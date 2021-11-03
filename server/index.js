
require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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

// for userinfo and image uploads

app.patch('/api/profile/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  console.log(req.body);
  if (!userId) {
    return;
  }
  const { caption, style, skill, instrument, mainInterest, interest, band, about } = req.body;
  const sql = `
  update "users"
     set "avaterCaption"=$1,
         "userStyle"=$2,
         "userSkills"=$3,
         "userInstruments"=$4,
         "userPrimaryInterest"=$5,
         "userInterest"=$6,
         "userBand"=$7,
         "userBio"=$8
  where  "userId"=$9
  returning "avaterCaption","userStyle","userSkills","userInstruments","userPrimaryInterest","userInterest","userBand","userBio"
  `;

  const params = [caption, style, skill, instrument, mainInterest, interest, band, about, userId];
  db.query(sql, params)
    .then(result => {
      const [userUpdatedInfo] = result.rows;
      console.log(userUpdatedInfo);
      res.json(userUpdatedInfo);
    })
    .catch(err => next(err));
});

app.patch('/api/profile/uploads/:userId', uploadsMiddleware, (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    return;
  }
  const avaterUrl = `/images/${req.file.filename}`;
  const sql = `
      update "users"
        set  "avaterUrl"=$1
      where  "userId"=$2
      returning "avaterUrl"
  `;

  const params = [avaterUrl, userId];
  db.query(sql, params)
    .then(result => {
      const [newImage] = result.rows;
      res.status(201).json(newImage);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
