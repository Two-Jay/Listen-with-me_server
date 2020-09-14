const playlist = require("../../models").PlayList;
const liked = require("../../models").likedList;
const music = require("../../models").Music;
const users = require("../../models").User;
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length === 71) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err) => {
        if (err) {
          res.status(401).send({ message: "random loading fail, need signin" });
        } else {
          playlist
            .findOne({ order: sequelize.fn("RAND") })
            .then(async (data) => {
              data.music = await music.findOne({
                where: { playlist_id: data.id },
              });
              data.likeAmount = await liked.count({
                where: { likedList_id: data.id },
              });
              data.user = await users.findOne({
                where: { id: data.owner_id },
              });
              let payload = {
                id: data.id,
                thumbnails: data.music.thumbnails,
                title: data.title,
                nickname: data.user.nickname,
                likeAmount: data.likeAmount,
              };
              res.status(200).send(payload);
            })
            .catch(() =>
              res
                .status(500)
                .send({ message: "random loading fail, server error" })
            );
        }
      });
    } else {
      res.status(400).send({ message: "random loading fail, invalid token" });
    }
  },
};
