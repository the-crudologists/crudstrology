const path = require('path');
const express = require('express');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { User, TimeLine, Follow, seeder } = require('../database/index.js');

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
  const { googleId } = req.user[0];
  User.findAll({
    where: {
      googleId: googleId
    }
  })
    .then((user) => {
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      console.error('Failed to finish request:', err);
      res.sendStatus(500);
    });
});

// <-- END PASSPORT DOCS

//patch User entry in DB with user input DOB
app.patch('/user/:googleId', (req, res) => {
  // console.log('req.body: ', req.body);
  const googleId = req.user[0].googleId;
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
          googleId: googleId
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

// Sends users data to the feed
app.get('/users/username', (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error('Failed to find anything:', err);
      res.sendStatus(500);
    });
});

// Creates a new user post
app.post('/user/post', (req, res) => {
  // console.log(req);
  const { post } = req.body;
  const { user_id } = req.user[0];

  User.findAll({
    where: {
      user_id: user_id
    }
  })
    .then(user => {
      if (user) {
        TimeLine.create({
          post: post,
          user_id: user_id
        });
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Request failure:', err);
      res.sendStatus(500);
    });
});

// Creates a follow in the follow schema
app.post('/follow', async (req, res) => {
  const { follow } = req.body;
  const { user_id } = req.user[0];

  const follower = await User.findByPk(user_id);
  const following = await User.findByPk(follow);

  follower.addFollowing(following)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Failed to POST:', err);
      res.sendStatus(500);
    });

});

app.delete('/follow/:user_id', (req, res) => {
  const follow = req.params.user_id;
  const { user_id } = req.user[0];

  Follow.destroy({
    where: {
      follower_id: user_id,
      following_id: follow
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error('Failed to DELETE:', err);
      res.sendStatus(500);
    });
});

// (async () => {
//   // <-- build seed script and call seeder() in that file...
//   await seeder();
// })();

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
