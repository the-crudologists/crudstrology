// router
const express = require('express');
const External = express.Router();
const axios = require('axios');
require('dotenv').config();

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
  axios
    .get('https://api.quotable.io/random')
    .then((result) => res.status(200).send(result.data))
    .catch((err) => res.status(500).send(err));
});

// API
External.post('/horo', (req, res) => {
  // console.log('____SERVER____');
  console.log('REQ BODY', req.body);
  const { user } = req.body;
  // getting the sign to be in lowercase for new api
  const { sign } = user;
  const lowercaseSign = sign.toLowerCase();
  console.log('USER DESTRUCTURED', user);
  axios
    .get(
      `http://sandipbgt.com/theastrologer/api/horoscope/${lowercaseSign}/today/`
    )
    // axios.post(`https://aztro.sameerkumar.website?sign=${user.sign}&day=today`)
    .then((result) => {
      console.log('RESULT from Aztro API', result.data);
      const { horoscope, sunsign } = result.data;
      const { mood, keywords, intensity } = result.data.meta;
      const newObj = {
        horoscope,
        sign: sunsign,
        mood: mood,
        keywords: keywords,
        intensity: intensity,
      };
      // result.data.sunsign = user.sign;
      res.status(200).send(newObj);
    })
    .catch((err) => res.sendStatus(500)); // console.log('Error from Aztro api post request SERVER', err)
});

// Compatibility API
External.get('/compatibility/:sign1/:sign2', (req, res) => {
  const { sign1, sign2 } = req.params;
  const options = {
    method: 'GET',
    url: 'https://horoscope-astrology.p.rapidapi.com/affinity',
    params: { sign1: `${sign1}`, sign2: `${sign2}` },
    headers: {
      'X-RapidAPI-Key': process.env.CompatibilityKey,
      'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com',
    },
  };

  // When a user clicks submit, data from the API should be fetched through a GET request
  axios(options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => console.log('Error in retrieving from comp api'));
});

module.exports = { External };
