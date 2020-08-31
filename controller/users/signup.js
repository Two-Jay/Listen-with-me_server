// const { user } = require("../../models");
// model definition 이전에 작업하여 해당 라인을 주석처리 함

module.exports = {
  post: (req, res) => {
    const { email, password, nickname } = req.body;

    if (email === null || email === '') {
      res.status(400).send('signup fail, invalid user data');
      return;
    }
    if (password === null || password === '') {
      res.status(400).send('signup fail, invalid user data');
      return;
    }
    if (nickname === null || nickname === '') {
      res.status(400).send('signup fail, invalid user data');
      return;
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
          res.status(409).send('signup fail, already exist user');
          return;
        }
        res.status(200).send('signup success');
      });
  },
};
