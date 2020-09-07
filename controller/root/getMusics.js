const music = require('../../models').Music;
const jwt = require('jsonwebtoken');
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, () => {
      music
        .findAll({ where: { playlist_id: req.query.id } })
        .then((data) => res.status(200).send(data))
        .catch(() =>
          res
            .status(500)
            .send({ message: 'list data loading fail, server error' })
        );
    });
  },
};
