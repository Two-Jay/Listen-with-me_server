const { models } = require('../models');
const users = models.User;

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
