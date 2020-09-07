const rooms = require('../../models').Room;
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      rooms
        .findOne({ where: { playlist_id: req.body.playlist_id } })
        .then((data) => {
          if (data) {
            res
              .status(409)
              .send({ message: 'createRoom fail, already exist room' });
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
                  .send({ message: 'createRoom fail, server error' })
              );
          }
        });
    });
  },
};
