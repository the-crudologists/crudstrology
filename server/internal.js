// router
const express = require('express');
const Internal = express.Router();

// const { Internal } = Router();

// auth
require('./auth.js');

// database
const { Quotes, Tarot, JournalEntry, Horoscope } = require('../database/index.js');
const Sequelize = require('sequelize');

// middleware
Internal.use(express.json());
Internal.use(express.urlencoded({ extended: true }));

// *****************************
// ***** INTERNAL DB HITS ******
// *****************************

// DB
Internal.post('/quote', (req, res) => {
  const { quote } = req.body;
  Quotes.create(quote)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('POST /api/quote', error);
      res.sendStatus(500);
    });
});

// DB
Internal.get('/all_quotes/', (req, res) => {
  Quotes.findAll()
    .then((quotesArr) => {
      res.status(200).send(quotesArr);
    }).catch((err) => {
      console.log('GET /api/quotes', err);
      res.sendStatus(500);
    });
});

// DB
Internal.get('/tarot', (req, res) => {
  Tarot.findAll({ order: Sequelize.literal('RAND()'), limit: 3 })
    .then((cards) =>
      res.status(200).send(cards)
    )
    .catch((err) => {
      console.error('Error from Tarot.findall /api/tarot server/index.js: ', err);
    });
});

Internal.delete('/quotes/:id', (req, res) => {
  const { id } = req.params;
  Quotes.destroy({
    where: {
      id: id
    }
  })
    .then(() => {
      res.sendStatus(204);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// For Journal entry
Internal.get('/jEntry', (req, res) => {
  JournalEntry.findAll({ 
    order: [['createdAt', 'DESC']]
  }).then((entries)=>{
      console.log(entries);
  res.status(200).send(entries);
  })

});

Internal.post('/jEntry', (req, res) => {
  // const { body } = req.body;
  console.log(req.body);
  JournalEntry.create(req.body);
  console.log('hi');
  res.status(200).send('Journal entry route hit successfully');
});

Internal.get('/horo', (req, res) => {
 
  Horoscope.findOne({
    order: [['createdAt', 'DESC']]
  })
    .then(latestHoroscope => {
      res.status(200).send(latestHoroscope);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = { Internal };
