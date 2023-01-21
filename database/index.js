const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'dbstrology',
  'root',
  '',
  {
    dialect: 'mysql'
  }
);

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {
  
    // Column-1, user_id is an object with 
    // properties like type, keys, 
    // validation of column.
    user_id:{
  
        // Sequelize module has INTEGER Data_Type.
        type:Sequelize.INTEGER,
  
        // To increment user_id automatically.
        autoIncrement:true,
  
        // user_id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
    },
  
    // Column-2, name
    name: { type: Sequelize.STRING, allowNull:false },
  
    // Column-3, email
    //email: { type: Sequelize.STRING, allowNull:false },
  
    // Column-4, default values for
    // dates => current time
    //myDate: { type: Sequelize.DATE, 
    //        defaultValue: Sequelize.NOW },
  
     // Timestamps
    // createdAt: Sequelize.DATE,
    // updatedAt: Sequelize.DATE,
})
  
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = User

// const mysql = require('mysql');
// //const { Quote } = require('./quotes');

// //const datBase = new Sequelize('dbstrology', 'root', '', { dialect: 'mysql' });
// // const Quote = datBase.define('Quote', {
// //   text: { type: DataTypes.STRING }
// // });

// //host: deploy database?

// // mysql.createConnection({
// //   user: 'root',
// //   password: ''
// // }).then((dbstrology) => {
// //   dbstrology.query('CREATE DATABASE IF NOT EXISTS dbstrology;');
// // })

// const dbstrology = mysql.createConnection({
//   user: 'root',
//   password: ''
// });

// dbstrology.connect(function(err) {
//   if (err){
//     throw err;
//   }
//   console.log('cake farts!!!');
// })

// dbstrology.query('CREATE DATABASE IF NOT EXISTS dbstrology;');

// const Quote = dbstrology.define('Quote', {
//   text: { type: DataTypes.STRING }
// });

// //const datBase = new Sequelize('dbstrology', 'root', '', { dialect: 'mysql' });

// //dbstrology.define




const seeder = async () => {
  console.log('the seeder function was invoked');
  await User.sync({ force: true });
  await User.create({ name: 'PtBarnum' });
  console.log('Database seeded with a test quote table and data');
}
seeder();
// //module.exports = { seeder };

