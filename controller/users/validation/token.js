const jwt = require("jsonwebtoken");
const users = require("../../../models").User;
module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res
              .status(403)
              .send({ message: "verifyToken fail, Token was expired" });
          } else {
            res
              .status(400)
              .send({ message: "verifyToken fail, invalid token" });
          }
        } else {
          let user = await users.findOne({ where: { id: decoded.userid } });
          if (user) {
            res.status(200).send({
              email: user.email,
              nickname: user.nickname,
              profileURL: user.profileURL,
              profileDescription: user.profileDescription,
            });
          } else {
            res.status(400).send({ message: "verifyToken fail, invalid user" });
          }
        }
      });
    } else {
      res.status(400).send({ message: "verifyToken fail, invalid token" });
    }
  },
};
