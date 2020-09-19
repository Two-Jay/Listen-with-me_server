const current = require("../../models").AudienceUser;
const playlist = require("../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: async (req, res) => {
    let list = await playlist.findOne({ where: { id: req.query.id } });
    if (list) {
      try {
        let count = await current.count({ where: { playList_id: list.id } });
        res.status(200).send({ listeners: count });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "getCurrentListener fail, server error" });
      }
    } else {
      res
        .status(404)
        .send({ message: "getCurrentListener fail, invalid playlist_id" });
    }
  },
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "addCurrentListener fail, need signin" });
        } else {
          let list = await playlist.findOne({
            where: { id: req.query.id },
          });
          if (list) {
            try {
              await current.create({
                playList_id: list.id,
                user_id: decoded.userid,
              });
              res.status(201).send({ message: "addCurrentListener success" });
            } catch (err) {
              console.log(err);
              res.status(500).send({
                message: "addCurrentListener fail, server error",
              });
            }
          } else {
            res.status(404).send({
              message: "addCurrentListener fail, invalid playlist_id",
            });
          }
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
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "removeCurrentListener fail, token needed" });
        } else {
          let list = await playlist.findOne({
            where: { id: req.query.id },
          });
          if (list) {
            try {
              await current.destroy({
                where: { playList_id: list.id, user_id: decoded.userid },
              });
              res
                .status(201)
                .send({ message: "removeCurrentListener success" });
            } catch (err) {
              console.log(err);
              res.status(500).send({
                message: "removeCurrentListener fail, server error",
              });
            }
          } else {
            res.status(404).send({
              message: "removeCurrentListener fail, invalid playlist_id",
            });
          }
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "removeCurrentListener fail, invalid token" });
    }
  },
};
