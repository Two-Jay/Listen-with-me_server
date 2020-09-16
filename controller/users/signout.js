const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err) => {
        if (err) {
          res.status(400).send({ message: "signout fail, invalid token" });
        } else {
          res
            .status(204)
            .set("Access-Control-Expose-Headers", "authorization")
            .set("authorization", "")
            .send({ message: "signout success" });
        }
      });
    } else {
      res.status(400).send({ message: "signout fail, invalid token" });
    }
  },
};
