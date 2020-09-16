const users = require('../../../models').User;

module.exports = {
  get: (req, res) => {
    const { email } = req.query;
    const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    users
      .findOne({
        where: {
          email: email,
        },
      })
      .then((result) => {
        if (result) {
          res.status(202).send({
            conflict: true,
            message: 'unavailable email, already exist email',
          });
        } else {
          if (regexr.test(email)) {
            res
              .status(200)
              .send({ conflict: false, message: 'available email' });
          } else {
            res
              .status(400)
              .send({ message: 'unavailable email, wrong address' });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'unavailable email, server error' });
      });
  },
};
