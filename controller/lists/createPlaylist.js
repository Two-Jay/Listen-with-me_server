const playlist = require("../../../models").PlayList;

module.exports = {
  post: (req, res) => {
    let token = req.cookies.user;
    jwt.verify(token, JWT_secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "createRoom fail, need signin" });
      } else {
        playlist
          .create({ title: req.body.list_title, owner_id: decoded.id })
          .then((data) => res.status(201).send({ playlist_id: data.id }))
          .catch(() =>
            res.status(500).send({ message: "createRoom fail, server error" })
          );
      }
    });
  },
};
