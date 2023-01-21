const path = require('path');
const express = require('express');
//const db = require('../database/index.js');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const app = express();

//middleware
app.use(express.static(DIST_DIR));


const PORT = 8080;

(async () => {

  await seeder();

  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
  });

})();

