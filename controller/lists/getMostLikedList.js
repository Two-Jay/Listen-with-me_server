const playlist = require("../../../models").PlayList;
const liked = require("../../../models").likedList;
const music = require("../../../models").Music;
const room = require("../../../models").Room;
const users = require("../../../models").User;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, JWT_secret, () => {
      playlist
        .findAll()
        .then((data) => {
          for (let i in data) {
            data[i]["room_id"] = room.findOne({
              where: { playlist_id: data[i]["id"] },
            }).id;
            data[i]["thumbnail"] = music.findOne({
              where: { playlist_id: data[i]["id"] },
            }).thumbnails;
            data[i]["likeAmount"] = liked.count({
              where: { likedList_id: data[i]["id"] },
            });
            data[i]["nickname"] = users.findOne({
              where: { id: data[i]["owner_id"] },
            }).nickname;
          }
        })
        .then((data) => {
          let payload = [];
          for (let j in data) {
            let tmpObj = {
              id: data[j].id,
              room_id: data[j].room_id,
              thumbnails: data[j].thumbnail,
              title: data[j].title,
              nickname: data[j].nickname,
              likeAmount: data[j].likeAmount,
            };
            payload.push(tmpObj);
          }
          payload.sort((a, b) => {
            return b.likeAmount - a.likeAmount;
          });
          res.status(200).send(payload);
        })
        .catch(() =>
          res.status(500).send({ message: "loading fail, server error" })
        );
    });
  },
};
