const { Sequelize, DataTypes} = require('sequelize');

//Database connection
const sequelize = new Sequelize('dumy_scrapping', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})
sequelize.authenticate().then( () => {
    console.log('Database connected successfully!')
}).catch(err => {
    console.log(`Unable to connect to the database`, err);
})


const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    }
 }, {timestamps: false});


 sequelize.sync({force: true});

 module.exports = users;