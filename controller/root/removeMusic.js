const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  delete: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "removeListEntry fail, need signin" });
        } else {
          let entry = await music.findOne({ where: { id: req.query.id } });
          if (entry) {
            try {
              await music.destroy({ where: { id: entry.id } });
              res.status(204).send({ message: "removeListEntry success" });
            } catch (err) {
              await res
                .status(500)
                .send({ message: "removeListEntry fail, server error" });
            }
          } else {
            res
              .status(404)
              .send({ message: "removeListEntry fail, listEntry not found" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "removeListEntry fail, invalid token" });
    }
  },
};
