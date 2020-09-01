import dotenv from 'dotenv';
import path from 'path';
import Token from 'jsonwebtoken';
dotenv.config({ path: path.join(__dirname, '../../.env') });
let tokenExpireTime = process.env.NODE_ENV === 'production' ? '6h' : '5m';
// 개발환경에 따른 토큰 expiretime 설정

const jwt = require('jsonwebtoken');
// const { user } = require("../../models");
// model definition 이전에 작업하여 해당 라인을 주석처리 함

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    let sess = req.session;

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
