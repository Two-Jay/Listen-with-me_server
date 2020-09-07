const rooms = require("../../models").Room;
const audiences = require("../../models").AudienceUser;
const jwt = require("jsonwebtoken");

module.exports = {
  delete: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, () => {
      rooms.findOne({ where: { id: req.query.id } }).then((room) => {
        if (room) {
          rooms
            .destroy({ where: { id: room.id } })
            .then(() =>
              audiences.destroy({ where: { playlist_id: room.playlist_id } })
            )
            .then(() =>
              res.status(204).send({ message: "room destroy success" })
            )
            .catch(() =>
              res
                .status(500)
                .send({ message: "room destroy fail, server error" })
            );
        } else {
          res
            .status(404)
            .send({ message: "room destroy fail, room not found" });
        }
      });
    });
  },
};
