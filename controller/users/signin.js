let tokenExpireTime = process.env.NODE_ENV === "production" ? "1d" : "1h";
// 개발환경에 따른 토큰 expiretime 설정

const jwt = require("jsonwebtoken");
const users = require("../../models").User;
const crypto = require("crypto");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    let encryptedPassword = crypto
      .createHash("sha256")
      .update(password + "quartette")
      .digest("hex");

    let result = await users.findOne({
      where: {
        email: email,
        password: encryptedPassword,
        OauthType: 0,
      },
    });
    if (result) {
      try {
        let token = jwt.sign(
          {
            userid: result.id,
          },
          process.env.JWT_secret,
          {
            expiresIn: tokenExpireTime,
          }
        );
        res
          .status(200)
          .set("Access-Control-Expose-Headers", "authorization")
          .set("authorization", `Bearer ${token}`)
          .send({
            email: result.email,
            nickname: result.nickname,
            profileURL: result.profileURL,
            profileDescription: result.profileDescription,
          });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "signin fail, server error" });
      }
    } else {
      res.status(404).send({ message: "signin fail, invalid user data" });
    }
  },
};
