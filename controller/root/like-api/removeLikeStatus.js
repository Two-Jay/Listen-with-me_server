const playlist = require("../../models").PlayList;
const liked = require("../../models").likedList;
const jwt = require("jsonwebtoken");
module.exports = {
  patch: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      playlist.findOne({ where: { id: req.query.id } }).then((list) => {
        if (list) {
          liked
            .destroy({
              where: { user_id: decoded.userid, likedList_id: list.id },
            })
            .then(() => {
              liked
                .count({ where: { likedList_id: list.id } })
                .then((count) =>
                  res.status(200).send({ list_id: list.id, likeAmount: count })
                )
                .catch(() =>
                  res
                    .status(500)
                    .send({ message: "removeLikeStatus fail, server error" })
                );
            })
            .catch(() =>
              res
                .status(500)
                .send({ message: "removeLikeStatus fail, server error" })
            );
        } else {
          res
            .status(404)
            .send({ message: "removeLikeStatus fail, list not found" });
        }
      });
    });
  },
};
