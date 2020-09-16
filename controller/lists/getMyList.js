const playlist = require("../../models").PlayList;
const acc = require("../../models").AccumulateAudience;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "getMylist fail, need signin" });
        } else {
          try {
            let payload = [];
            let list = await playlist.findAll({
              where: { owner_id: decoded.userid },
            });

            for (let i in list) {
              let musicData = await music.findOne({
                where: { playlist_id: list[i]["id"] },
              });
              let likeAmount = await liked.count({
                where: { likedList_id: list[i]["id"] },
              });
              let audienceAmount = await acc.count({
                where: { playlist_id: list[i]["id"] },
              });
              let tmpObj = {
                id: list[i].id,
                title: list[i].title,
                thumbnail: musicData === null ? null : musicData.thumbnails,
                user_id: list[i].owner_id,
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
              .send({ message: "getMylist Loading fail, server error" });
          }
        }
      });
    } else {
      res.status(400).send({ message: "getMyList fail, invalid token" });
    }
  },
};
