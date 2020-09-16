const playlist = require("../../models").PlayList;
const music = require("../../models").Music;
const room = require("../../models").Room;
const liked = require("../../models").likedList;
const acc = require("../../models").AccumulateAudience;
const audience = require("../../models").AudienceUser;
const jwt = require("jsonwebtoken");
module.exports = {
  delete: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "removePlaylist fail, need Authentication" });
        } else {
          try {
            await music.destroy({
              where: { playlist_id: Number(req.query.id) },
            });
            await room.destroy({
              where: { playlist_id: Number(req.query.id) },
            });
            await liked.destroy({
              where: { likedList_id: Number(req.query.id) },
            });
            await acc.destroy({ where: { playlist_id: Number(req.query.id) } });
            await audience.destroy({
              where: { playList_id: Number(req.query.id) },
            });
            await playlist.destroy({ where: { id: Number(req.query.id) } });
            res.status(204).send({ message: "removePlaylist success" });
          } catch (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "removePlaylist fail, server error" });
          }
        }
      });
    } else {
      res.status(400).send({ messsage: "removePlaylist fail, invalid token" });
    }
  },
};
