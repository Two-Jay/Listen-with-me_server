const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err) => {
      if (err) {
        res.status(401).send({ message: "getRoomStatus fail, need signin" });
      } else {
        rooms
          .findOne({ where: { id: req.query.id } })
          .then((room) => {
            if (room) {
              res.status(200).send(room);
            } else {
              res
                .status(404)
                .send({ message: "getRoomStatus fail, room not found" });
            }
          })
          .catch(() =>
            res
              .status(500)
              .send({ message: "getRoomStatus fail, server error" })
          );
      }
    });
  },
};
