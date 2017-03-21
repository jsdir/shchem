const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

module.exports = new Sequelize(process.env[config.use_env_variable], {
  logging: false,
  dialectOptions: {
    ssl: true
  }
});
