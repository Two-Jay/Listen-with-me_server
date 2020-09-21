const users = require("../../../models").User;

module.exports = {
  get: (req, res) => {
    const password = req.query.password;
    const regexr = /^(?=.*[a-zA-Z\d])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.\/?])/;
    //length > 8 / 영문/숫자/특수문자

    try {
      if (password.length < 8 || regexr.test(password) === false) {
        res.status(202).send({
          conflict: true,
          message: "unavailable password, conflict with conditions",
        });
      } else {
        res.status(200).send({ conflict: true, message: "available password" });
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "password validation fail, server error" });
    }
  },
};
