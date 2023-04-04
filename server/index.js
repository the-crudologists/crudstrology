const path = require('path');
const express = require('express');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { User, TimeLine, seeder } = require('../database/index.js');

require('dotenv').config();
const { SERVER_SESSION_SECRET } = process.env;

const { Internal } = require('./internal.js');
const { External } = require('./external.js');

require('./auth.js');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
app.use(cookieSession({
  keys: [SERVER_SESSION_SECRET]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', External);
app.use('/db', Internal);

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

// react home view*
app.get('/', (req, res) => {
  res.end();
});

// routes to google login page
app.get('/login', (req, res) => {
  // href needs to be '/auth/google'
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// <-- PASSPORT DOCS
app.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }));

// <-- shoddy logged in auth/object -->
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  }
);

// passing res.send(req.user) inside this endpoint becomes undefined.. 'fixed' w/ loggedInUser
app.get('/auth/user', (req, res) => {
  // console.log(req);
  res.send(req.user);
});

// <-- END PASSPORT DOCS

//patch User entry in DB with user input DOB
app.patch('/user/:googleId', (req, res) => {
  //console.log('req.body: ', req.body);
  const { googleId } = req.params;
  User.update(req.body, {
    where: {
      googleId: googleId
    },
    returning: true
  })
    .then((response) => {
      //console.log('response: ', response);
      User.findAll({
        where: {
          googleId: loggedInUser.googleId
        }
      })
        .then((response) => {
          // update user entry with new sign? may work on client side
          res.status(200).send(response);
        })
        .catch((err) => {
          console.log('failed to find user after updating DOB', err);
        });
    })
    .catch((err) => {
      console.log('update user error:', err);
      res.sendStatus(500);
    });
});

// Fetches all the posts made by any user
app.get('/users/feed', (req, res) => {
  TimeLine.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Cannot find anything:', err);
      res.sendStatus(500);
    });
});

(async () => {
  // <-- build seed script and call seeder() in that file...
  await seeder();
})();

// <-- SERVER WILDCARD -->
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: http://localhost:${PORT}`);
});
