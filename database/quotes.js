const sequelize = require('sequelize');

const Quote = sequelize.define('Quote', {
  id: sequelize.NUMBER,
  text: sequelize.STRING
});

module.exports = {Quote};
