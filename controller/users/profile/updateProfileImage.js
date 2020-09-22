const users = require("../../../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "image update fail, need signin" });
        } else {
          try {
            await users.update(
              { profileURL: req.file.location },
              {
                where: { id: decoded.userid },
              }
            );
            res.status(200).send({ image_url: req.file.location });
          } catch (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "image update fail, server error" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "image update fail, invalid token" });
    }
  },
};
