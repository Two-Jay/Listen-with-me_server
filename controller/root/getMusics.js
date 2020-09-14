const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.get("authorization").substring(7);
    jwt.verify(token, process.env.JWT_secret, (err) => {
      if (err) {
        res
          .status(401)
          .send({ message: "list data loading fail, need signin" });
      } else {
        music
          .findAll({ where: { playlist_id: req.query.id } })
          .then((data) => res.status(200).send(data))
          .catch(() =>
            res
              .status(500)
              .send({ message: "list data loading fail, server error" })
          );
      }
    });
  },
};
