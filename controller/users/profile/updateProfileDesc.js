const users = require('../../../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
  patch: (req, res) => {
    let token = req.cookies.user;
    jwt.verify(token, JWT_secret, (err, decoded) => {
      if (err) {
        res
          .status(400)
          .send({ message: 'description update fail, bad request' });
      } else {
        users
          .update(
            { profileDescription: req.body.description },
            {
              where: { id: decoded.userid },
            }
          )
          .then(() =>
            res.status(200).send({ message: 'description update success' })
          )
          .catch(() =>
            res
              .status(500)
              .send({ message: 'description update fail, server error' })
          );
      }
    });
  },
};
