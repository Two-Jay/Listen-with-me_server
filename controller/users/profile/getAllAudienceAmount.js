const acc = require("../../../models").AccumulateAudience;
const playlist = require("../../../models").PlayList;
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "getAllAudienceAmount fail, need signin" });
        } else {
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
                  console.log(err);
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
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "getAllAudienceAmount fail, invalid token" });
    }
  },
};
