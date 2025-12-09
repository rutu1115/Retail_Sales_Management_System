require('dotenv').config();
const { Sequelize } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('FATAL: DATABASE_URL is not set in environment');
  process.exit(1);
}

// Disable logging unless DEBUG is set
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.DEBUG ? console.log : false,
  dialectOptions: {
    // keep default
  }
});

module.exports = sequelize;
