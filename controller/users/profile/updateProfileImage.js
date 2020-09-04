const users = require('../../../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
  patch: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.status(400).send({ message: 'image update fail, invalid file' });
      } else {
        users
          .update(
            { profileURL: req.file.location },
            {
              where: { id: decoded.userid },
            }
          )
          .then(() => res.status(200).send({ image_url: req.file.location }))
          .catch(() =>
            res.status(500).send({ message: 'image update fail, server error' })
          );
      }
    });
  },
};
