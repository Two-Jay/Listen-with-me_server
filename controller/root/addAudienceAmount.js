const acc = require('../../models').AccumulateAudience;
const playlist = require('../../models').PlayList;
module.exports = {
  patch: (req, res) => {
    playlist.findOne({ where: { id: req.body.playlist_id } }).then((list) => {
      if (list) {
        acc
          .create({
            room_id: req.body.room_id,
            playlist_id: list.id,
            listener_id: req.body.listener_id,
          })
          .then(() =>
            res.status(200).send({ message: 'addAudienceAmount success' })
          )
          .catch(() =>
            res
              .status(500)
              .send({ message: 'addAudienceAmount fail, server error' })
          );
      } else {
        res
          .status(404)
          .send({ message: 'addAudienceAmount fail, playlist not found' });
      }
    });
  },
};
