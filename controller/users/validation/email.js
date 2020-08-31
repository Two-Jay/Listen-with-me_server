const { models } = require("../../models");
const users = models.User;

module.exports = {
  get: (req, res) => {
    users
      .findOne({ where: { nickname: req.query.nickname } })
      .then((data) => {
        if (data) {
          res
            .status(409)
            .send({ message: "unavailable nickname, already exists nickname" });
        } else {
          res.status(200).send({ message: "available nickname" });
        }
      })
      .catch(() =>
        res.status(500).send({ message: "nickname check fail, server error" })
      );
  },
};
