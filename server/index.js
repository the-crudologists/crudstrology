const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
const { Quotes, User, Tarot, seeder } = require('../database/index.js');

require('dotenv').config();
const { SERVER_SESSION_SECRET } = process.env;
// try requiring files for database like this...

require('./auth.js');

const Sequelize = require('sequelize');

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
    // console.log('app.get(/auth/google) passport.authenticate server/index.js req :', req);
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
let loggedInUser;
const loggedInSessions = {};
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // console.log('REQ', req.user);
    loggedInUser = req.user[0].dataValues;
    if (!loggedInSessions[loggedInUser.googleId]) {
      loggedInSessions[loggedInUser.googleId] = {
        name: loggedInUser.name,
        sessionID: req.sessionID,
        dob: loggedInUser.dob,
        sign: loggedInUser.sign
      };
    }
    // console.log('Logged-In-Sessions OBJECT', loggedInSessions);
    res.redirect('/');
  }
);


// passing res.send(req.user) inside this endpoint becomes undefined.. 'fixed' w/ loggedInUser
app.get('/auth/user', (req, res) => {
  console.log('/auth/user endpoint hit', loggedInUser);
  res.send(loggedInUser);
});

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



app.post('/api/quote', (req, res) => {
  const { quote } = req.body;
  console.log(quote);
  Quotes.create(quote)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('POST /api/quote', error);
      res.sendStatus(500);
    });
});

app.get('/api/all_quotes/', (req, res) => {
  Quotes.findAll()
    .then((quotesArr) => {
      console.log(quotesArr);
      res.status(200).send(quotesArr);
    }).catch((err) => {
      console.log('GET /api/quotes', err);
      res.sendStatus(500);
    });

  //if the get is not successful, set sc to 500 and log the err
});

// when a quote is liked it is added to database
// *****************************
// ***** EXTERNAL API HITS *****
// *****************************

// GET request from server to quote api
// result.data is the quote object
app.get('/api/quotes', (req, res) => {
  axios.get('https://api.quotable.io/random')
    .then(result => res.status(200).send(result.data))
    .catch(err => res.status(500).send(err));
});

app.post('/api/horo', (req, res) => {
  // console.log('____SERVER____');
  // console.log('REQ BODY', req.body)
  const { user } = req.body;
  // console.log('USER DESTRUCTURED', user);
  axios.post(`https://aztro.sameerkumar.website?sign=${user.sign}&day=today`)
    .then(result => {
      // console.log('RESULT from Aztro API', result.data);
      result.data.sign = user.sign;
      res.status(200).send(result.data);
    })
    .catch(err => console.log('Error from Aztro api post request SERVER', err));
});

app.get('/api/tarot', (req, res) => {
  Tarot.findAll({ order: Sequelize.literal('RAND()'), limit: 3 })
    .then((cards) =>
      res.status(200).send(cards)
    )
    .catch((err) => {
      console.error('Error from Tarot.findall /api/tarot server/index.js: ', err);
    });
});



// <-- TO FETCH ALL TAROT CARDS upon front end, no longer needed -->
// app.get('/api/cards', (req, res) => {
//   axios.get('https://tarot-api.onrender.com/api/v1/cards')
//     .then(response => {
//       console.log('<-- FROM TAROT API -->'); // response.data.cards
//       Tarot.bulkCreate(response.data.cards)
//         .then(() => {
//           console.log('<-- DATABASE --> BULK CREATED TAROT TABLE');
//           res.sendStatus(200);
//         })
//         .catch(err => {
//           console.log('<-- DATABASE --> ERROR BULK CREATE TAROT TABLE', err);
//           res.sendStatus(500);
//         })
//     })
//     .catch(err => {
//       console.log('<-- API --> ERROR FROM TAROT API', err);
//       res.sendStatus(400);
//     })
// });

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
