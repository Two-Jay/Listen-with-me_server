const playlist = require("../../../models").PlayList;
const liked = require("../../../models").likedList;
const jwt = require("jsonwebtoken");
module.exports = {
  patch: (req, res) => {
    let token = req.get("authorization").substring(7);
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "removeLikeStatus fail, need signin" });
      } else {
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
                    res
                      .status(200)
                      .send({ list_id: list.id, likeAmount: count })
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
      }
    });
  },
};
