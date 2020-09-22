const playlist = require("../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  patch: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "editPlaylistTitle fail, need authentication" });
        } else {
          try {
            let list = await playlist.update(
              { title: req.body.title },
              { where: { id: req.query.id } }
            );
            res.status(200).send({ title: list.title });
          } catch (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "editPlaylistTitle fail, server error" });
          }
        }
      });
    } else {
      res
        .status(403)
        .send({ message: "editPlaylistTitle fail, invalid token" });
    }
  },
};
