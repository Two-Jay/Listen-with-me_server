let tokenExpireTime = process.env.NODE_ENV === 'production' ? '1h' : '5m';
// 개발환경에 따른 토큰 expiretime 설정

const jwt = require('jsonwebtoken');
const users = require('../../models').User;

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
        if (result) {
          let token = jwt.sign(
            {
              userid: result.id,
            },
            process.env.JWT_secret,
            {
              expiresIn: tokenExpireTime,
            }
          );

          res.status(200).cookie('authorization', token).send({
            email: email,
            nickname: result.nickname,
            profileURL: result.profileURL,
            profileDescription: result.profileDescription,
          });
        } else {
          res.status(404).send({ message: 'signin fail, invalid user data' });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'signin fail, server error' });
      });
  },
};
