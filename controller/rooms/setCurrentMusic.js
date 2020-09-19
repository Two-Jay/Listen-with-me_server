const rooms = require("../../models").Room;
const jwt = require("jsonwebtoken");

module.exports = {
  patch: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err) => {
        if (err) {
          res
            .status(401)
            .send({ message: "setCurrentMusic fail, need signin" });
        } else {
          let room = await rooms.findOne({
            where: { id: Number(req.query.id) },
          });
          if (room) {
            try {
              let data = await rooms.update(
                { currentMusic_id: Number(req.body.music_id) },
                { where: { id: Number(room.id) } }
              );
              res.status(205).send({
                room_id: data.id,
                currentMusic_id: data.currentMusic_id,
              });
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "setCurrentMusic fail, server error" });
            }
          } else {
            res
              .status(404)
              .send({ message: "setCurrentMusic fail, room not found" });
          }
        }
      });
    } else {
      res.status(400).send({ message: "setCurrentMusic fail, invalid token" });
    }
  },
};
