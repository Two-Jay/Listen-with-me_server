const users = require("../../../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  patch: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length === 71) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "image update fail, need signin" });
        } else {
          users
            .update(
              { profileURL: req.file.location },
              {
                where: { id: decoded.userid },
              }
            )
            .then(() => res.status(200).send({ image_url: req.file.location }))
            .catch(() =>
              res
                .status(500)
                .send({ message: "image update fail, server error" })
            );
        }
      });
    } else {
      res.status(400).send({ message: "imafe update fail, invalid token" });
    }
  },
};
