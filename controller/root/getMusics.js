const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "list data loading fail, need signin" });
        } else {
          try {
            let data = await music.findAll({
              where: { playlist_id: req.query.id },
            });
            if (data) {
              res.status(200).send(data);
            } else {
              res
                .status(404)
                .send({ message: "list data loading fail, no music exists" });
            }
          } catch (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "list data loading fail, server error" });
          }
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "list data loading fail, invalid token" });
    }
  },
};
