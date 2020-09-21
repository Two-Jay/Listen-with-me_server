const users = require("../../models").User;
const crypto = require("crypto");

module.exports = {
  post: async (req, res) => {
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

    let user = await users.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(409).send({ message: "signup fail, already exist user" });
    } else {
      try {
        await users.create({
          email: email,
          password: encryptedPassword,
          nickname: nickname,
          OauthType: 0,
        });
        res.status(201).send({ message: "signup success" });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "signup fail, server error" });
      }
    }
  },
};
