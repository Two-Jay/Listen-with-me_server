const playlist = require("../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  patch: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length === 71) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "editPlaylistTitle fail, need authentication" });
        } else {
          playlist
            .update({ title: req.body.title }, { where: { id: req.query.id } })
            .then(() => res.status(200).send({ title: req.body.title }))
            .catch(() =>
              res
                .status(500)
                .send({ message: "editPlaylistTitle fail, server error" })
            );
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "editPlaylistTitle fail, invalid token" });
    }
  },
};
