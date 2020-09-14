const users = require("../../../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  patch: (req, res) => {
    let token = req.get("authorization").substring(7);
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send({ message: "description update fail, need signin" });
      } else {
        users
          .update(
            { profileDescription: req.body.description },
            {
              where: { id: decoded.userid },
            }
          )
          .then(() =>
            res.status(200).send({ message: "description update success" })
          )
          .catch(() =>
            res
              .status(500)
              .send({ message: "description update fail, server error" })
          );
      }
    });
  },
};
