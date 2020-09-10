const playlist = require("../../models").PlayList;
const acc = require("../../models").AccumulateAudience;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
      let payload = [];

      if (err) {
        res
          .status(404)
          .send({ message: "likedList Loading fail, invalid userid" });
      } else {
        try {
          let likes = await liked.findAll({
            where: { user_id: decoded.userid },
          });

          for (let i in likes) {
            let list = await playlist.findOne({
              where: { id: likes[i].likedList_id },
            });
            let musicData = await music.findOne({
              where: { playlist_id: list.id },
            });
            let likeAmount = await liked.count({
              where: { likedList_id: list.id },
            });
            let audienceAmount = await acc.count({
              where: { playlist_id: list.id },
            });
            let tmpObj = {
              id: list.id,
              title: list.title,
              thumbnail: musicData === null ? null : musicData.thumbnails,
              user_id: list.owner_id,
              likeAmount: likeAmount,
              audienceAmount: audienceAmount,
            };

            payload.push(tmpObj);
          }
          res.status(200).send(payload);
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .send({ message: "likedList Loading fail, server error" });
        }
      }
    });
  },
};
