const Sequelize = require('sequelize');

const sequelize = new Sequelize('crypto-table', 'root', '@Ritesh123', {
    dialect: 'mysql',
    host: 'localhost'
}); 

module.exports = sequelize; 