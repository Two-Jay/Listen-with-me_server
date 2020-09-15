const current = require("../../models").AudienceUser;
const playlist = require("../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    playlist.findOne({ where: { id: req.body.playlist_id } }).then((list) => {
      if (list) {
        current
          .count({ where: { playList_id: list.id } })
          .then((count) => res.status(200).send({ listeners: count }))
          .catch(() =>
            res
              .status(500)
              .send({ message: "getCurrentListener fail, server error" })
          );
      } else {
        res
          .status(404)
          .send({ message: "getCurrentListener fail, invalid playlist_id" });
      }
    });
  },
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "addCurrentListener fail, need signin" });
        } else {
          playlist
            .findOne({ where: { id: req.body.playlist_id } })
            .then((list) => {
              if (list) {
                current
                  .create({ playList_id: list.id, user_id: decoded.userid })
                  .then(() =>
                    res
                      .status(201)
                      .send({ message: "addCurrentListener success" })
                  )
                  .catch(() =>
                    res.status(500).send({
                      message: "addCurrentListener fail, server error",
                    })
                  );
              } else {
                res.status(404).send({
                  message: "addCurrentListener fail, invalid playlist_id",
                });
              }
            });
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "addCurrentListener fail, invalid token" });
    }
  },
  delete: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "removeCurrentListener fail, token needed" });
        } else {
          playlist
            .findOne({ where: { id: req.body.playlist_id } })
            .then((list) => {
              if (list) {
                current
                  .destroy({
                    where: { playList_id: list.id, user_id: decoded.userid },
                  })
                  .then(() =>
                    res
                      .status(201)
                      .send({ message: "removeCurrentListener success" })
                  )
                  .catch(() =>
                    res.status(500).send({
                      message: "removeCurrentListener fail, server error",
                    })
                  );
              } else {
                res.status(404).send({
                  message: "removeCurrentListener fail, invalid playlist_id",
                });
              }
            });
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "removeCurrentListener fail, invalid token" });
    }
  },
};
