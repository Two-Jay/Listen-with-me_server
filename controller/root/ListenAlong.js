const playlist = require("../../models").PlayList;
const users = require("../../models").User;
const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");
module.exports = {
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res.status(401).send({ message: "searching fail, need signin" });
        } else {
          let user = await users.findOne({
            where: { nickname: req.body.nickname },
          });
          if (user) {
            let list = await playlist.findAll({ where: { owner_id: user.id } });
            if (list) {
              try {
                for (let i in list) {
                  let room = await rooms.findOne({
                    where: { playlist_id: list[i]["id"] },
                  });
                  if (room) {
                    res.status(200).send({ id: room.id });
                  }
                }
                res
                  .status(202)
                  .send({ message: "searching success, but room closed" });
              } catch (err) {
                console.log(err);
                res
                  .status(500)
                  .send({ message: "searching fail, server error" });
              }
            } else {
              res.status(400).send({ message: "searching fail, bad request" });
            }
          } else {
            res.status(404).send({ message: "searching fail, user not found" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "searching fail, invalid token" });
    }
  },
};
