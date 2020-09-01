const dotenv = require('dotenv');
const path = require('path');
const Token = require('jsonwebtoken');
dotenv.config({ path: path.join(__dirname, '../../.env') });
let tokenExpireTime = process.env.NODE_ENV === 'production' ? '6h' : '5m';
// 개발환경에 따른 토큰 expiretime 설정

const jwt = require('jsonwebtoken');
const { models } = require('../models');
const users = models.User;

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;

    users
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((result) => {
        if (result === null) {
          res.status(404).send({ message: 'signin fail, invalid user data' });
        } else {
          let token = jwt.sign(
            {
              email: email,
              nickname: result.nickname,
              profileURL: result.profileURL,
              profileDescription: result.profileDescription,
            },
            JWT_secret,
            {
              expriesIn: tokenExpireTime,
            }
          );

          res.status(200).cookie('user', Token).json({
            token: token,
          });
        }
      })
      .catch((err) => {
        res.status(404).send({ message: 'signin fail, server error' });
      });
  },
};
