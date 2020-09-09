const playlist = require("../../models").PlayList;
const acc = require("../../models").AccumulateAudience;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    let payload = [];
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res
          .status(404)
          .send({ message: "likedList Loading fail, invalid userid" });
      } else {
        liked.findAll({ where: { user_id: decoded.userid } }).then((likes) => {
          for (let i in likes) {
            let tempObj = playlist.findOne({
              where: { id: likes[i].likedList_id },
            });
            musicData = music.findOne({
              where: { playlist_id: likes[i]["id"] },
            });
            tempObj.thumbnail = musicData.thumbnails;
            tempObj.likeAmount = liked.count({
              where: { likedList_id: likes[i]["id"] },
            });
            tempObj.audienceAmount = acc.count({
              where: { playlist_id: likes[i]["id"] },
            });
            payload.push(tempObj);
          }
          res.status(200).send(payload);
        });
        /*
          .catch(() =>
            res
              .status(500)
              .send({ message: "likedList Loading fail, server error" })
          );
          */
      }
    });
  },
};
