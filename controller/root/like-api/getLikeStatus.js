const playlist = require("../../../models").PlayList;
const liked = require("../../../models").likedList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send({ message: "likeStatus loading fail, need signin" });
      } else {
        playlist.findOne({ where: { id: req.query.id } }).then((list) => {
          if (list) {
            liked
              .findOne({
                where: { user_id: decoded.userid, likedList_id: list.id },
              })
              .then((like) => {
                if (like) {
                  res.status(200).send({ likeStatus: true });
                } else {
                  res.status(200).send({ likeStatus: false });
                }
              })
              .catch(() =>
                res
                  .status(500)
                  .send({ message: "likeStatus loading fail, server error" })
              );
          } else {
            res
              .status(404)
              .send({ message: "likeStatus loading fail, playlist not found" });
          }
        });
      }
    });
  },
};
