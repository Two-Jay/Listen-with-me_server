const playlist = require("../../models").PlayList;
const users = require("../../models").User;
const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");
module.exports = {
  post: (req, res) => {
    let token = req.get("authorization").substring(7);
    jwt.verify(token, process.env.JWT_secret, (err) => {
      if (err) {
        res.status(401).send({ message: "searching fail, need signin" });
      } else {
        users
          .findOne({ where: { nickname: req.body.nickname } })
          .then((user) => playlist.findAll({ where: { owner_id: user.id } }))
          .then((list) => {
            if (list) {
              for (let i in list) {
                rooms
                  .findOne({ where: { playlist_id: list[i]["id"] } })
                  .then((room) => {
                    if (room) {
                      res.status(200).send({ id: room.playlist_id });
                    }
                  });
              }
              res
                .status(202)
                .send({ message: "searching success, but room closed" });
            } else {
              res.status(400).send({ message: "searching fail, bad request" });
            }
          })
          .catch(() =>
            res.status(500).send({ message: "searching fail, server error" })
          );
      }
    });
  },
};
