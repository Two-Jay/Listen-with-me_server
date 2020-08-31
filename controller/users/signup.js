// const { user } = require("../../models");
// model definition 이전에 작업하여 해당 라인을 주석처리 함

const { emailValidation } = require('.');

module.exports = {
  post: (req, res) => {
    const { email, password, nickname } = req.body;

    if (email === null || email === '') {
      return res.status(400).send('signup fail, invalid user data');
    }
    if (password === null || password === '') {
      return res.status(400).send('signup fail, invalid user data');
    }
    if (nickname === null || nickname === '') {
      return res.status(400).send('signup fail, invalid user data');
    }

    users
      .fineOrCreate({
        where: {
          email: email,
        },
        defaults: {
          password: password,
          nickname: nickname,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('signup fail, already exist user');
        }
        return res.status(200).send('signup success');
      });
  },
};
