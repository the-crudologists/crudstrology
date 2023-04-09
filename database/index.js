// const User = require('./user.js');
const fakeTarot = require('./fakeData/tarot.json');
const fakeHoro = require('./fakeData/horoscope.json');
const fakeQuote = require('./fakeData/quotes.json');

const axios = require('axios');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'dbstrology',
  'root',
  '',
  {
    host: '127.0.0.1',
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

const Follow = sequelize.define('follow', {
  follower_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  following_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  }
});

User.belongsToMany(User, {
  as: 'followers',
  through: Follow,
  foreignKey: 'following_id'
});

User.belongsToMany(User, {
  as: 'following',
  through: Follow,
  foreignKey: 'follower_id'
});

// <-- May need to include Foreign Key for relationship with User...
const Tarot = sequelize.define('tarotCard', {
  type: { type: Sequelize.STRING },
  name_short: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING, unique: true },
  value: { type: Sequelize.STRING },
  value_int: { type: Sequelize.INTEGER },
  meaning_up: { type: Sequelize.TEXT },
  meaning_rev: { type: Sequelize.STRING },
  desc: { type: Sequelize.TEXT }
});

// Tarot.belongsTo(User, {foreignKey: 'user_id'})

const Horoscope = sequelize.define('horoscope', {
  date_range: { type: Sequelize.STRING },
  current_date: {
    type: Sequelize.STRING,
    defaultValue: () => new Date().toLocaleDateString()
  },
  description: { type: Sequelize.TEXT },
  sunsign: { type: Sequelize.STRING },
  mood: { type: Sequelize.STRING },
  keywords: { type: Sequelize.STRING },
  intensity: { type: Sequelize.STRING },
  lucky_number: { type: Sequelize.INTEGER },
  lucky_time: { type: Sequelize.STRING }
});
Horoscope.belongsTo(User, {foreignKey: 'user_id'});

const JournalEntry = sequelize.define('journal_entry', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'user_id'
    }
  }
});

JournalEntry.belongsTo(User, {foreignKey: 'user_id'});

const Quotes = sequelize.define('quote', {
  _id: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING, unique: true },
  author: { type: Sequelize.STRING },
});

const TimeLine = sequelize.define('timeline', {
  post: { type: Sequelize.STRING },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'user_id'
    }
  }
});

TimeLine.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(TimeLine);

const fetchTarotCards = () => {
  axios.get('https://tarot-api.onrender.com/api/v1/cards')
    .then(response => {
      console.log('<-- FROM TAROT API -->'); // response.data.cards
      Tarot.bulkCreate(response.data.cards)
        .then(bulk => {
          console.log('<-- DATABASE --> BULK CREATED TAROT TABLE');
        })
        .catch(err => {
          console.log('<-- DATABASE --> ERROR BULK CREATE TAROT TABLE', err);
        });
    })
    .catch(err => {
      console.log('<-- API --> ERROR FROM TAROT API', err);
    });
};

// uncomment to reset the database
// sequelize.sync({ force: true });

// uncomment to update current tables
// sequelize.sync({ alter: true });

// run to seed the tarotCard database
// fetchTarotCards();

// <-- might not need to be async -->
const seeder = async () => {
  console.log('the seeder function was invoked');
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    {
      name: 'Francis',
      dob: '01/19',
      sign: 'Aquarius',
      googleId: '103795232001627912412'
    },
    {
      name: 'Jessica',
      dob: '03/20',
      sign: 'Pisces',
      googleId: '103795232001627912409'
    },
    {
      name: 'Nicole',
      dob: '05/30',
      sign: 'Gemini',
      googleId: '103795232001627912407'
    },
    {
      name: 'Carlos',
      dob: '11/11',
      sign: 'Scorpio',
      googleId: '103795232001627912408'
    }
  ])
    .then(() => { console.log('User Model Create Success'); })
    .catch((err) => { console.error('User Model Create Failure', err); });
  await TimeLine.bulkCreate([
    {
      post: 'Hello everyone',
      user_id: 1
    },
    {
      post: 'the world is mystifying',
      user_id: 2
    },
    {
      post: 'I was here!!!',
      user_id: 3
    },
    {
      post: 'Begin again =)',
      user_id: 4
    }
  ])
    .then(() => { console.log('Created Post'); })
    .catch((err) => { console.error('Failed to create Post', err); });
  await Follow.bulkCreate([
    {
      follower_id: 4,
      following_id: 1
    },
    {
      follower_id: 4,
      following_id: 2
    },
    {
      follower_id: 4,
      following_id: 3
    },
    {
      follower_id: 3,
      following_id: 1
    },
    {
      follower_id: 3,
      following_id: 2
    },
    {
      follower_id: 3,
      following_id: 4
    },
    {
      follower_id: 2,
      following_id: 1
    },
    {
      follower_id: 2,
      following_id: 3
    },
    {
      follower_id: 2,
      following_id: 4
    },
    {
      follower_id: 1,
      following_id: 2
    },
    {
      follower_id: 1,
      following_id: 3
    },
    {
      follower_id: 1,
      following_id: 4
    }
  ])
    .then(() => { console.log('Created follow list'); })
    .catch((err) => { console.error('Failed to create followers'); });
  fetchTarotCards();
  /*await Quotes.create()
    .then(() => { console.log('Quote Model Create Success'); })
    .catch((err) => { console.error('Quote Model Create Failure', err); });
  console.log('Database seeded with a test quote table and data');
  */
};

module.exports.Tarot = Tarot;
module.exports.User = User;
module.exports.Follow = Follow;
module.exports.Quotes = Quotes;
module.exports.TimeLine = TimeLine;
module.exports.sequelize = sequelize;
module.exports.seeder = seeder;
module.exports.JournalEntry = JournalEntry;
module.exports.Horoscope = Horoscope;
