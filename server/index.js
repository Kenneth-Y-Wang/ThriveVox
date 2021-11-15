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
const audioUploadsMiddleware = require('./uploads-middleware-audio');
const authorizationMiddleware = require('./authorization-middleware');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./messages');
const {
  userJoinRoom,
  currentUsers,
  userLeave,
  getRoomUsers
} = require('./users');

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
const server = http.createServer(app);
const io = socketio(server);

// for sign-in and sign-up

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, email, location } = req.body;
  if (!username || !password || !email || !location) {
    throw new ClientError(400, 'username, password, email and location are required fields');
  }
  const modifyLocation = location.toLowerCase();
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword","email","userLocation")
        values ($1, $2, $3, $4)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword, email, modifyLocation];
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

// search users

app.get('/api/users/search', (req, res, next) => {

  const { location, searchType } = req.query;

  let sql;
  if (searchType === 'band') {
    sql = `
     select "userId",
            "username",
            "email",
            "userLocation",
            "avaterUrl",
            "userStyle",
            "userSkills",
            "userInstruments",
            "userPrimaryInterest",
            "userInterest",
            "userBand",
            "userBio"
      from  "users"
      where "userLocation" =$1
        and "userBand" IS NOT NULL
        and "userBand" != 'null'
     `;
  } else {
    sql = `
    select "userId",
            "username",
            "email",
            "userLocation",
            "avaterUrl",
            "userStyle",
            "userSkills",
            "userInstruments",
            "userPrimaryInterest",
            "userInterest",
            "userBand",
            "userBio"
      from  "users"
      where "userLocation" =$1
    `;
  }

  const params = [location];
  db.query(sql, params)
    .then(result => {
      const usersRow = result.rows;
      res.json(usersRow);
    })
    .catch(err => next(err));

});

// post a feed

app.post('/api/posts/create', audioUploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { title, post, time } = req.body;

  if (!title || !post) {
    throw new ClientError(400, 'title and post content are required fields');
  }
  let audioUrl;
  if (req.file) {
    audioUrl = `/audios/${req.file.filename}`;
  }
  const sql = `
insert into "posts" ("userId","title","createdAt","content","audioUrl")
values ($1,$2,$3,$4,$5)
returning "postId","title","content","userId","audioUrl"
`;

  const params = [userId, title, time, post, audioUrl];
  db.query(sql, params)
    .then(result => {
      const [newPost] = result.rows;
      res.json(newPost);
    })
    .catch(err => next(err));

});

// get all feeds

app.get('/api/posts/allPosts', (req, res, next) => {
  const sql = `
  select "userId",
         "username",
         "email",
         "avaterUrl",
         "userBand",
         "userLocation",
         "title",
         "content",
         "posts"."createdAt" as "createdAt",
         "audioUrl",
         "postId"
    from "posts"
    join "users" using ("userId")
    order by "postId" desc

  `;

  db.query(sql)
    .then(result => {
      const allPosts = result.rows;
      res.json(allPosts);
    })
    .catch(err => next(err));
});
// home page get all feed by user

app.get('/api/posts/allMyPosts', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
  select "userId",
         "username",
         "email",
         "avaterUrl",
         "userBand",
         "userLocation",
         "title",
         "content",
         "posts"."createdAt" as "createdAt",
         "audioUrl",
         "postId"
    from "posts"
    join "users" using ("userId")
    where "userId" =$1
    order by "postId" desc

  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const allPosts = result.rows;
      res.json(allPosts);
    })
    .catch(err => next(err));
});
// delete a post

app.delete('/api/posts/allPosts/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);

  const sql = `
  delete from "posts"
  where "postId"=$1
  returning *
  `;
  const params = [postId];

  db.query(sql, params)
    .then(result => {
      const post = result.rows[0];
      if (!post) {

        throw new ClientError(400, `cannot find content with postId ${postId}`);
      } else {

        res.sendStatus(204);
      }
    })
    .catch(err => next(err));

});
// leave comment

app.post('/api/comments/create', (req, res, next) => {
  const { userId } = req.user;
  const { content, postId, time } = req.body;

  if (!content) {
    throw new ClientError(400, 'comment content is required fields');
  }

  const sql = `
   insert into "comments" ("userId","content","postId", "createdAt")
   values ($1,$2,$3,$4)
   returning *
  `;

  const params = [userId, content, postId, time];
  db.query(sql, params)
    .then(result => {
      const [newComment] = result.rows;
      res.json(newComment);
    })
    .catch(err => next(err));
});
// get comments
app.get('/api/comments/allComments/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  const sql = `
  select "username",
         "comments"."createdAt" as "createdAt",
         "content",
         "commentId"
    from "comments"
    join "users" using ("userId")
    where "postId"=$1
    order by "commentId"
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const allComments = result.rows;
      res.json(allComments);
    })
    .catch(err => next(err));
});
// get user feed in search section

app.get('/api/posts/allUserPosts/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const sql = `
  select "title",
         "content",
         "createdAt",
         "audioUrl",
         "postId"
    from "posts"
    where "userId" =$1
    order by "postId" desc

  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const allPosts = result.rows;
      res.json(allPosts);
    })
    .catch(err => next(err));
});
// chat starts

io.on('connection', socket => {

  socket.on('joinRoom', ({ username }) => {
    const room = socket.handshake.query.roomName;
    socket.join(room);
    const user = userJoinRoom(socket.id, username, room);

    socket.emit('message', formatMessage('ThriveVox', 'Welcome to ThriveVox'));

    socket.broadcast
      .to(room)
      .emit('message', formatMessage('ThriveVox', `${user.username} has joined the room`));

    io.to(room).emit('roomUsers', getRoomUsers(room));
  });

  socket.on('messageChat', newMsg => {
    const user = currentUsers(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, newMsg));
  });

  socket.on('typing', () => {
    const user = currentUsers(socket.id);
    socket.broadcast.to(user.room)
      .emit('typing', formatMessage(user.username, ' is typing a message...'));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room)
        .emit('message', formatMessage('ThriveVox', `${user.username} has left the room`));
      io.to(user.room).emit('roomUsers', getRoomUsers(user.room));
    }
  });

});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
