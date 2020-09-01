const dotenv = require('dotenv');
const path = require('path');
dotenv.config(path.join(__dirname, '../.env'));

module.exports = {
  development: {
    username: 'root' || process.env.RDS_USERNAME,
    password: 'null' || process.env.RDS_PASSWORD,
    database: 'database_development',
    host: 'localhost' || process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
  test: {
    username: 'root' || process.env.RDS_USERNAME,
    password: null || process.env.RDS_PASSWORD,
    database: 'database_development',
    host: 'localhost' || process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
  production: {
    username: 'root' || process.env.RDS_USERNAME,
    password: null || process.env.RDS_PASSWORD,
    database: 'database_development',
    host: 'localhost' || process.env.RDS_HOSTNAME,
    port: 3306 || process.env.RDS_PORT,
    dialect: 'mysql',
  },
};
