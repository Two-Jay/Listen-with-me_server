const acc = require("../../../models").AccumulateAudience;
const playlist = require("../../../models").PlayList;
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
      try {
        let count = 0;
        let list = await playlist.findAll({
          where: { owner_id: decoded.userid },
        });
        if (list) {
          for (let i in list) {
            try {
              let number = await acc.count({
                where: { playlist_id: list[i]["id"] },
              });
              count = count + number;
            } catch (err) {
              res.status(500).send({
                message: "getAllAudienceAmount fail, server error",
              });
            }
          }
          res.status(200).send({ audienceAmount: count });
        }
      } catch (err) {
        res
          .status(400)
          .send({ message: "getAllAudienceAmount fail, bad request" });
      }
    });
  },
};
