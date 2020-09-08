const acc = require("../../models").AccumulateAudience;
const playlist = require("../../models").PlayList;
const jwt = require("jsonwebtoken");
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    let count = 0;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      playlist.findAll({ where: { owner_id: decoded.userid } }).then((list) => {
        if (list) {
          for (let i in list) {
            acc
              .count({ where: { playlist_id: list[i]["id"] } })
              .then((number) => {
                count = count + number;
              })
              .catch(() =>
                res.status(500).send({
                  message: "getAllAudienceAmount fail, server error",
                })
              );
          }
          res.status(200).send({ audienceAmount: count });
        } else {
          res
            .status(400)
            .send({ message: "getAllAudienceAmount fail, bad request" });
        }
      });
    });
  },
};
