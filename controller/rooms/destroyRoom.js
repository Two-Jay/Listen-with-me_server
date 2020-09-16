const rooms = require('../../models').Room;
const audiences = require('../../models').AudienceUser;
const acc = require('../../models').AccumulateAudience;
const jwt = require('jsonwebtoken');

module.exports = {
  delete: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {

      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err) => {
        if (err) {
          res.status(401).send({ message: 'room destroy fail, need signin' });
        } else {
          rooms.findOne({ where: { id: req.query.id } }).then((room) => {
            if (room) {
              acc
                .update({ room_id: null }, { where: { room_id: req.query.id } })
                .then(() => rooms.destroy({ where: { id: req.query.id } }))
                .then(() =>
                  audiences.destroy({
                    where: { playList_id: room.playlist_id },
                  })
                )
                .then(() =>
                  res.status(204).send({ message: 'room destroy success' })
                )
                .catch(() =>
                  res
                    .status(500)
                    .send({ message: 'room destroy fail, server error' })
                );
            } else {
              res
                .status(404)
                .send({ message: 'room destroy fail, room not found' });
            }
          });
        }
      });
    } else {
      res.status(400).send({ message: 'room destroy fail, invalid token' });
    }
  },
};
