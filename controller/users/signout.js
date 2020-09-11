const jwt = require('jsonwebtoken');

module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err) => {
      if (err) {
        res.status(500).send({ message: 'signout fail, server error' });
      } else {
        res.status(204).clearCookie(token).send({ message: 'signout success' });
      }
    });
  },
};
