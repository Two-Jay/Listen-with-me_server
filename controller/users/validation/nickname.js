const { models } = require("../../models");
const users = models.User;

module.exports = {
  patch: (req, res) => {
    let sess = req.session;
    if (sess.userid) {
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
                  where: { id: sess.userid },
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
    }
  },
};
