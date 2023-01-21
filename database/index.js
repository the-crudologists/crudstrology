const sequelize = require('sequelize');
const Quote = require('./quotes');

//host: deploy database?


const database = new Sequelize( 'dbstrology', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});

const seeder = async () => {
  console.log('the seeder function was invoked');
  await Quote.sync({ force: true });
  await Quote.create({id:0, text:'fuck fred'});
  console.log('Database seeded with a test quote table and data');
}

module.exports = { seeder };
