// router
const express = require('express');
const External = express.Router();
const axios = require('axios');

// const { External } = Router();

// auth
require('./auth.js');

// middleware
External.use(express.json());
External.use(express.urlencoded({ extended: true }));

// *****************************
// ***** EXTERNAL API HITS *****
// *****************************

// API
External.get('/quotes', (req, res) => {
  axios.get('https://api.quotable.io/random')
    .then(result => res.status(200).send(result.data))
    .catch(err => res.status(500).send(err));
});

// API
External.post('/horo', (req, res) => {
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
    .catch(err => res.sendStatus(500)); // console.log('Error from Aztro api post request SERVER', err)
});

module.exports = { External };
