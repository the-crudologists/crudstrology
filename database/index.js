// const User = require('./user.js');
const fakeTarot = require('./fakeData/tarot.json');
const fakeHoro = require('./fakeData/horoscope.json');

console.log('fake Tarot', fakeTarot.cards[0]);

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'dbstrology',
  'root',
  '',
  {
    dialect: 'mysql'
  }
);

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.

// ******
const User = sequelize.define('user', {
  // Column-1, user_id is an object with 
  // properties like type, keys, 
  // validation of column.
  user_id: {
      // Sequelize module has INTEGER Data_Type.
      type: Sequelize.INTEGER,
      // To increment user_id automatically.
      autoIncrement: true,
      // user_id can not be null.
      allowNull: false,
      // For uniquely identify user.
      primaryKey: true
  },
  // Column-2, name
  name: { 
    type: Sequelize.STRING, 
    allowNull: false 
  },
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

// <-- might not need to be async -->
// changed User.sync to sequelize.sync
const seeder = async () => {
  console.log('the seeder function was invoked');
  await sequelize.sync({ force: true });
  await User.create({ name: 'PtBarnum' })
    .then(() => {console.log('User Model Create Success')})
    .catch((err) => {console.log('User Model Create Failure', err)});
  await Tarot.create(fakeTarot.cards[0])
    .then(() => {console.log('Tarot Model Create Success')})
    .catch((err) => {console.log('Tarot Model Create Failure', err)});
  console.log('Database seeded with a test quote table and data');
}
// seeder();
// module.exports = { seeder };

// module.exports.User = User;
module.exports.sequelize = sequelize;
module.exports.seeder = seeder;
