const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');

AWS.config.loadFromPath(__dirname + '/../config/aws-config.json');

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'BUCKET_NAME',
      key: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
      acl: 'public-read-write',
    }),
  }),
};
