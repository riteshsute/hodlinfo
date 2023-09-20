const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const CryptoPrice = sequelize.define('crypto_price', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  last: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  buy: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  sell: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  volume: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  base_unit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = CryptoPrice;
