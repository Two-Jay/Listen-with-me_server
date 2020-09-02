const dotenv = require('dotenv');
const path = require('path');
dotenv.config(path.join(__dirname, '../.env'));

module.exports = {
  accessKeyId: process.env.S3_IMAGEBUCKET_ACCESSKEY,
  secretAccessKey: process.env.S3_IMAGEBUCKET_SECRETKEY,
  region: 'ap-northeast-2',
};
