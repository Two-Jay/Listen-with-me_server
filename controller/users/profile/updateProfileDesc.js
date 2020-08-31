const { models } = require("../../models");
const users = models.User;

module.exports = {
  patch: (req, res) => {
    let sess = req.session;
    if (sess.userid) {
      users
        .update(
          { profileDescription: req.body.description },
          {
            where: { id: sess.userid },
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
    } else {
      res.status(400).send({ message: "description update fail, bad request" });
    }
  },
};
