const users = require("../../models").User;
const crypto = require("crypto");

module.exports = {
  post: (req, res) => {
    const { email, password, nickname } = req.body;

    if (email === null || email === "") {
      res.status(400).send({ message: "signup fail, invalid user data" });
      return;
    }
    if (password === null || password === "") {
      res.status(400).send({ message: "signup fail, invalid user data" });
      return;
    }
    if (nickname === null || nickname === "") {
      res.status(400).send({ message: "signup fail, invalid user data" });
      return;
    }

    let encryptedPassword = crypto
      .createHash("sha256")
      .update(password + "quartette")
      .digest("hex");

    users
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          password: encryptedPassword,
          nickname: nickname,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          res.status(409).send({ message: "signup fail, already exist user" });
          return;
        }
        res.status(200).send({ message: "signup success" });
      });
  },
};
