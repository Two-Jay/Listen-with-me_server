const users = require('../../../models').User;

module.exports = {
  get: (req, res) => {
    users
      .findOne({ where: { nickname: req.query.nickname } })
      .then((data) => {
        if (data) {
          res.status(202).send({
            conflict: true,
            message: 'unavailable nickname, already exists nickname',
          });
        } else {
          res
            .status(200)
            .send({ conflict: false, message: 'available nickname' });
        }
      })
      .catch(() =>
        res.status(500).send({ message: 'nickname check fail, server error' })
      );
  },
};
