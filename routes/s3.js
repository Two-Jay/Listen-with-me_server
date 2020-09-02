const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');

// AWS.config.loadFromPath(__dirname + '/../config/aws-config.js');
AWS.config.loadFromPath(__dirname + '/../config/aws-config.json');

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      //테스트를 위해 임의로 버킷 지정
      bucket: 'lwm-test',
      key: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
      acl: 'public-read-write',
    }),
  }),
};
