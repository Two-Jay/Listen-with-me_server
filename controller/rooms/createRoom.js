const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    let token = req.get("authorization").substring(7);
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "createRoom fail, need signin" });
      } else {
        rooms
          .findOne({ where: { playlist_id: req.body.playlist_id } })
          .then((data) => {
            if (data) {
              res
                .status(409)
                .send({ message: "createRoom fail, already exist room" });
            } else {
              rooms
                .create({
                  host_id: decoded.userid,
                  playlist_id: req.body.playlist_id,
                })
                .then((room) => res.status(201).send({ id: room.id }))
                .catch(() =>
                  res
                    .status(500)
                    .send({ message: "createRoom fail, server error" })
                );
            }
          });
      }
    });
  },
};
