const liked = require("../../../models").likedList;
const playlist = require("../../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
      let count = 0;
      try {
        let list = await playlist.findAll({
          where: { owner_id: decoded.userid },
        });
        if (list) {
          for (let i in list) {
            try {
              let likes = await liked.count({
                where: { likedList_id: list[i]["id"] },
              });
              count = count + likes;
            } catch (err) {
              res
                .status(500)
                .send({ message: "getAllLikeAmount fail, server error" });
            }
          }
          res.status(200).send({ likeAmount: count });
        }
      } catch (err) {
        res.status(400).send({ message: "getAllLikeAmount fail, bad request" });
      }
    });
  },
};
