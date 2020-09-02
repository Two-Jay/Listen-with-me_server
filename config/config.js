const dotenv = require('dotenv');
const path = require('path');
dotenv.config(path.join(__dirname, '../.env'));

module.exports = {
  development: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: 'database_development',
    host: process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
  test: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: 'database_test',
    host: process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: 'database_production',
    host: process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
};
