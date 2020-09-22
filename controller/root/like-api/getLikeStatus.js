const playlist = require("../../../models").PlayList;
const liked = require("../../../models").likedList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "likeStatus loading fail, need signin" });
        } else {
          let list = await playlist.findOne({ where: { id: req.query.id } });
          if (list) {
            try {
              let like = await liked.findOne({
                where: { user_id: decoded.userid, likedList_id: list.id },
              });
              if (like) {
                res.status(200).send({ likeStatus: true });
              } else {
                res.status(200).send({ likeStatus: false });
              }
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "likeStatus loading fail, server error" });
            }
          } else {
            res.status(404).send({
              message: "likeStatus loading fail, playlist not found",
            });
          }
        }
      });
    } else {
      res
        .status(403)
        .send({ message: "likeStatus loading fail, invalid token" });
    }
  },
};
