const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.S3_IMAGEBUCKET_ACCESSKEY;
AWS.config.secretAccessKey = process.env.S3_IMAGEBUCKET_SECRETKEY;
AWS.config.region = 'ap-northeast-2';

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'lwm-test',
      key: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
      acl: 'public-read-write',
    }),
  }),
};
