const playlist = require("../../models").PlayList;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const users = require("../../models").User;
const room = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, async (err) => {
      if (err) {
        res.status(401).send({ message: "loading fail, need signin" });
      } else {
        try {
          let data;
          let payload = [];

          if (req.query.limit) {
            data = await playlist.findAll({ limit: Number(req.query.limit) });
          } else {
            data = await playlist.findAll();
          }

          for (let i in data) {
            let checkRoom = await room.findOne({
              where: { playlist_id: data[i]["id"] },
            });

            if (checkRoom) {
              data[i]["musicData"] = await music.findOne({
                where: { playlist_id: data[i]["id"] },
              });
              data[i]["likeAmount"] = await liked.count({
                where: { likedList_id: data[i]["id"] },
              });
              data[i]["userData"] = await users.findOne({
                where: { id: data[i]["owner_id"] },
              });

              let tmpObj = {
                id: data[i].id,
                room_id: checkRoom.id,
                thumbnails:
                  data[i].musicData === null
                    ? null
                    : data[i].musicData.thumbnails,
                title: data[i].title,
                nickname: data[i].userData.nickname,
                likeAmount: data[i].likeAmount,
              };

              payload.push(tmpObj);
            }
          }

          payload.sort((a, b) => {
            return b.likeAmount - a.likeAmount;
          });

          res.status(200).send(payload);
        } catch (err) {
          console.log(err);
          res.status(500).send({ message: "loading fail, server error" });
        }
      }
    });
  },
};
