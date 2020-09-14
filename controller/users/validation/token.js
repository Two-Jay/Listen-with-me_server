const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length === 71) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err) => {
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
          res.status(200).send({ message: "verifyToken success, valid token" });
        }
      });
    } else {
      res.status(400).send({ message: "verifyToken fail, invalid token" });
    }
  },
};
