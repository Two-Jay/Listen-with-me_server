const playlist = require("../../models").PlayList;
const rooms = require("../../models").Room;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const users = require("../../models").User;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res.status(401).send({ message: "random loading fail, need signin" });
        } else {
          let newList = [];
          let list = await playlist.findAll();
          if (list) {
            try {
              for (let i in list) {
                let room = await rooms.findOne({
                  where: { playlist_id: list[i]["id"] },
                });
                if (room) {
                  newList.push(list[i]);
                }
              }
              if (newList.length === 0) {
                res
                  .status(400)
                  .send({ message: "random loading fail, no rooms opened" });
              } else {
                let randIndex = Math.floor(Math.random() * newList.length);
                let tempData = newList[randIndex];
                let musicData = await music.findOne({
                  where: { playlist_id: tempData.id },
                });
                let likeAmount = await liked.count({
                  where: { likedList_id: tempData.id },
                });
                let userData = await users.findOne({
                  where: { id: tempData.owner_id },
                });
                let payload = {
                  id: tempData.id,
                  thumbnails: musicData.thumbnails,
                  titie: tempData.title,
                  nickname: userData.nickname,
                  likeAmount: likeAmount,
                };
                res.status(200).send(payload);
              }
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "random loading fail, server error" });
            }
          } else {
            res.status(404).send("random loading fail, no playlist exists");
          }
        }
      });
    } else {
      res.status(400).send({ message: "random loading fail, invalid token" });
    }
  },
};
