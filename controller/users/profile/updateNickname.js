const { models } = require("../../../models");
const jwt = require("jsonwebtoken");
const users = models.User;

module.exports = {
  patch: (req, res) => {
    let token = req.cookies.user;
    jwt.verify(token, JWT_secret, (err, decoded) => {
      users
        .findOne({ where: { nickname: req.body.nickname } })
        .then((data) => {
          if (data) {
            res.status(409).send({
              message: "unavailable nickname, already exists nickname",
            });
          } else {
            users
              .update(
                { nickname: req.body.nickname },
                {
                  where: { id: decoded.userid },
                }
              )
              .then(() =>
                res.status(200).send({ message: "nickname update success" })
              )
              .catch(() =>
                res
                  .status(500)
                  .send({ message: "nickname update fail, server error" })
              );
          }
        })
        .catch(() =>
          res
            .status(500)
            .send({ message: "nickname update fail, server error" })
        );
    });
  },
};
