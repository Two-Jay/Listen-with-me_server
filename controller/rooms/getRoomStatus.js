const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res.status(401).send({ message: "getRoomStatus fail, need signin" });
        } else {
          let room = await rooms.findOne({ where: { id: req.query.id } });
          if (room) {
            try {
              res.status(200).send(room);
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "getRoomStatus fail, server error" });
            }
          } else {
            res
              .status(404)
              .send({ message: "getRoomStatus fail, room not found" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "getRoomStatus fail, invalid token" });
    }
  },
};
