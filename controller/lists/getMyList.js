const playlist = require("../../models").PlayList;
const acc = require("../../models").AccumulateAudience;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.status(400).send({ message: "getMylist fail, bad request" });
      } else {
        playlist
          .findAll({
            where: { owner_id: decoded.userid },
          })
          .then((data) => {
            for (let i in data) {
              data[i]["thumbnail"] = music.findOne({
                where: { playlist_id: data[i]["id"] },
              }).thumbnails;
              data[i]["likeAmount"] = liked.count({
                where: { likedList_id: data[i]["id"] },
              });
              data[i]["audienceAmount"] = acc.count({
                where: { playlist_id: data[i]["id"] },
              });
            }
          })
          .then((data) => {
            let payload = [];
            for (let j in data) {
              let tmpObj = {
                id: data[j].id,
                title: data[j].title,
                thumbnail: data[j].thumbnail,
                user_id: data[j].owner_id,
                likeAmount: data[j].likeAmount,
                audienceAmount: data[j].audienceAmount,
              };
              payload.push(tmpObj);
            }
            res.status(200).send(payload);
          })
          .catch(() =>
            res
              .status(500)
              .send({ message: "getMylist Loading fail, server error" })
          );
      }
    });
  },
};
