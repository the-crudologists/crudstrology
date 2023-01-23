const path = require('path');
const express = require('express');
const { seeder } = require('../database/index.js');
//const db = require('../database/index.js');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(DIST_DIR));

// react home view*
app.get('/', (req, res) => {
  res.end();
});

// routes to google login page
app.get('/login', (req, res) => {
  // href needs to be '/auth/google'
  res.send('<a href="/">Authenticate with Google</a>');
});

app.get('/auth/google', (req, res) => {

});

// once user is logged in, route to 'logged-in' view*
app.get('/protected', (req, res) => {
  res.send('Hello');
});

(async () => {

  await seeder();

  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
  });

})();

