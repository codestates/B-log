require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'firstproject',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'firstproject',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
