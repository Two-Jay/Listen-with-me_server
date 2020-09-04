const playlist = require('../../../models').PlayList;

module.exports = {
  patch: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, JWT_secret, (err) => {
      if (err) {
        res
          .status(401)
          .send({ message: 'editPlaylistTitle fail, need authentication' });
      } else {
        playlist
          .update({ title: req.body.title }, { where: { id: req.query.id } })
          .then(() => res.status(200).send({ title: req.body.title }))
          .catch(() =>
            res
              .status(500)
              .send({ message: 'editPlaylistTitle fail, server error' })
          );
      }
    });
  },
};
