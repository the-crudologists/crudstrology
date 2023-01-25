const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const dotenv = require('dotenv').config();
const { SERVER_SESSION_SECRET } = process.env;
// try requiring files for database like this...
require('./auth.js');
const { seeder } = require('../database/index.js');
const db = require('../database/index.js');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
app.use(session({ secret: SERVER_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

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
  }
  ), (req, res) => {
    console.log('app.get(/auth/google) passport.authenticate server/index.js req :', req);
  });

// ****
// <-- BELOW -->
// assign information to above object from authenticated req object from google API
// ex: 
// req.sessionID, 
// req.user === user entered into DB from auth.js profile
// req.user[0].dataValues.name === name from above
// req.user[0].dataValues.googleId === googleId from database
// req.rawHeaders[req.rawHeaders.length - 1] === logged in cookie (connect.sid) encrypted
// ****
// <-- working -->
const loggedInSessions = {};
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // console.log('REQ', req);
    if (!loggedInSessions[req.user[0].dataValues.googleId]) {
      loggedInSessions[req.user[0].dataValues.googleId] = {
        name: req.user[0].dataValues.name,
        sessionID: req.sessionID
      };
    }
    console.log('Logged-In-Sessions OBJECT', loggedInSessions);
    res.redirect('/');
  }
);
// How will we look up the user on the loggedInSessions object coming from the front-end??
// Build out endpoint to handle AXIOS request from front end for DB information...


// <-- OLD -->
// working, but couldn't get callback to authenticate to fire...
// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     //add path to '/protected' below to handle successful login
//     successRedirect: '/', // ex: '/auth/google/success'
//     failureRedirect: '/login' // ex: '/auth/google/failure'
//   }), (req, res) => {
//     console.log('app.get(/auth/google/callback) passport.authenticate server/index.js req :', req)
//   })
// <-- END PASSPORT DOCS

// once user is logged in, route to 'logged-in' view*
app.get('/protected', isLoggedIn, (req, res) => {
  res.send('Login Successful');
});


// <-- SERVER WILDCARD -->


(async () => {
  // <-- build seed script and call seeder() in that file...
  await seeder();

  app.listen(PORT, () => {
    console.log(`listening on port: http://localhost:${PORT}`);
  });

})();

