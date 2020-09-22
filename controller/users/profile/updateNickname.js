const users = require("../../../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  patch: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({ message: "nickname update fail, need signin" });
        } else {
          let data = await users.findOne({
            where: { nickname: req.body.nickname },
          });
          if (data) {
            res.status(409).send({
              message: "unavailable nickname, already exists nickname",
            });
          } else {
            try {
              await users.update(
                { nickname: req.body.nickname },
                {
                  where: { id: decoded.userid },
                }
              );
              res.status(200).send({ message: "nickname update success" });
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "nickname update fail, server error" });
            }
          }
        }
      });
    } else {
      res.status(403).send({ message: "nickname update fail, invalid token" });
    }
  },
};
