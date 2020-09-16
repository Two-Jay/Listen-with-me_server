const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "createRoom fail, need signin" });
        } else {
          let data = await rooms.findOne({
            where: { playlist_id: req.body.playlist_id },
          });
          if (data) {
            res
              .status(409)
              .send({ message: "createRoom fail, already exist room" });
          } else {
            try {
              let room = await rooms.create({
                host_id: decoded.userid,
                playlist_id: req.body.playlist_id,
              });
              res.status(201).send({ id: room.id });
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "createRoom fail, server error" });
            }
          }
        }
      });
    } else {
      res.status(400).send({ message: "createRoom fail, invalid token" });
    }
  },
};
