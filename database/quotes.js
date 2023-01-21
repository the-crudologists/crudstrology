const { Sequelize } = require('sequelize');
const { database } = require ('./index.js')

// const Quote = database.define('Quote', {
//   text: Sequelize.STRING
// });
// const Quote = database.define('Quote', {
//   text: { type: DataTypes.STRING}
// });

module.exports = { Quote };
