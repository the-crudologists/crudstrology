// const User = require('./user.js');
const fakeTarot = require('./fakeData/tarot.json');
const fakeHoro = require('./fakeData/horoscope.json');
const fakeQuote = require('./fakeData/quotes.json');
const axios = require('axios');

// console.log('fake Tarot', fakeTarot.cards[0]);

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'dbstrology',
  'root',
  '',
  {
    dialect: 'mysql',
    logging: false
  }
);

const User = sequelize.define('user', {
  googleId: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  dob: {
    type: Sequelize.STRING
  },
  sign: {
    type: Sequelize.STRING
  }
});

// <-- May need to include Foreign Key for realtionship with User...
const Tarot = sequelize.define('tarotCard', {
  type: { type: Sequelize.STRING },
  name_short: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  value: { type: Sequelize.STRING },
  value_int: { type: Sequelize.INTEGER },
  meaning_up: { type: Sequelize.STRING },
  meaning_rev: { type: Sequelize.STRING },
  desc: { type: Sequelize.TEXT }
});

const Horoscope = sequelize.define('horoscope', {
  date_range: { type: Sequelize.STRING },
  current_date: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  compatibility: { type: Sequelize.STRING },
  mood: { type: Sequelize.STRING },
  color: { type: Sequelize.STRING },
  lucky_number: { type: Sequelize.STRING },
  lucky_time: { type: Sequelize.STRING }
});

const Quote = sequelize.define('quote', {
  _id: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
});

// <-- might not need to be async -->
const seeder = async () => {
  console.log('the seeder function was invoked');
  await sequelize.sync({ force: true });
  await User.create({ 
    name: 'PtBarnum',
    dob: '01/19',
    sign: 'Banana'
  })
    .then(() => { console.log('User Model Create Success'); })
    .catch((err) => { console.error('User Model Create Failure', err); });
  await Tarot.create(fakeTarot.cards[0])
    .then(() => { console.log('Tarot Model Create Success'); })
    .catch((err) => { console.error('Tarot Model Create Failure', err); });
  await Quote.create(fakeQuote.results[0])
    .then(() => { console.log('Quote Model Create Success'); })
    .catch((err) => { console.error('Quote Model Create Failure', err); });

  console.log('Database seeded with a test quote table and data');
};

module.exports.User = User;
module.exports.sequelize = sequelize;
module.exports.seeder = seeder;
