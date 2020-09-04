const playlist = require('../../../models').PlayList;
const music = require('../../../models').Music;
const jwt = require('jsonwebtoken');
module.exports = {
  delete: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, JWT_secret, (err) => {
      if (err) {
        res
          .status(401)
          .send({ message: 'removePlaylist fail, need Authentication' });
      } else {
        playlist
          .destroy({ where: { id: req.query.id } })
          .then(() => music.destroy({ where: { playlist_id: req.query.id } }))
          .then(() =>
            res.status(204).send({ message: 'removePlaylist success' })
          )
          .catch(() =>
            res
              .status(500)
              .send({ message: 'removePlaylist fail, server error' })
          );
      }
    });
  },
};
