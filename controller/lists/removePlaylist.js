const playlist = require("../../../models").PlayList;

module.exports = {
  post: (req, res) => {
    let token = req.cookies.user;
    jwt.verify(token, JWT_secret, (err) => {
      if (err) {
        res
          .status(401)
          .send({ message: "removePlaylist fail, need Authentication" });
      } else {
        playlist
          .destroy({ where: { id: req.body.id } })
          .then(() =>
            res.status(204).send({ message: "removePlaylist success" })
          )
          .catch(() =>
            res
              .status(500)
              .send({ message: "removePlaylist fail, server error" })
          );
      }
    });
  },
};
