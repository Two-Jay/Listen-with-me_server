const users = require("../../../models").User;

module.exports = {
  get: async (req, res) => {
    try {
      let data = await users.findOne({
        where: { nickname: req.query.nickname },
      });
      if (data) {
        res.status(202).send({
          conflict: true,
          message: "unavailable nickname, already exists nickname",
        });
      } else {
        res
          .status(200)
          .send({ conflict: false, message: "available nickname" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "nickname check fail, server error" });
    }
  },
};
