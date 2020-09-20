const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_client_id);
const tokenExpireTime = process.env.NODE_ENV === "production" ? "1d" : "1h";
const jwt = require("jsonwebtoken");
const users = require("../../../models").User;

module.exports = {
  post: async (req, res) => {
    let token = req.body.id_token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    console.log(ticket);

    users
      .findOrCreate({
        where: {
          email: ticket.payload.email,
        },
        default: {
          nickname: ticket.payload.name,
          profileURL: ticket.payload.picture,
          OauthType: "google",
        },
      })
      .then(async ([user, created]) => {
        let jwt = jwt.sign(
          {
            userid: user.id,
          },
          process.env.JWT_secret,
          {
            expiresIn: tokenExpireTime,
          }
        );
        if (created) {
          res
            .status(201)
            .set("Access-Control-Expose-Headers", "authorization")
            .set("authorization", `Bearer ${token}`)
            .send({
              user: {
                email: user.email,
                nickname: user.nickname,
                profileURL: user.profileURL,
                profileDescription: user.profileDescription,
              },
              message:
                "Google-auth-signin success, this is first approach to our client",
            });
          return;
        }
        if (!created && token) {
          res
            .status(200)
            .set("Access-Control-Expose-Headers", "authorization")
            .set("authorization", `Bearer ${token}`)
            .send({
              user: {
                email: user.email,
                nickname: user.nickname,
                profileURL: user.profileURL,
                profileDescription: user.profileDescription,
              },
              message: "Google-auth-signin success, welcome back",
            });
          return;
        }
        res
          .status(400)
          .send({ message: "Google-auth-signin fail, wrong approach" });
        return;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Google-auth-signin fail, server error" });
      });
    // TODO : Google oauth 구현
    // 클라이언트로 token 받음
    // id token은 이미 validation 이 되어 오므로 다시 validation할 필요 없음

    // 1. token 에서 유저정보 가져오기
    // 2. 해당 정보를 userDB에서 탐색
    // 3. 없으면 USER 데이터베이스에 레코드 생성
    // 4. 유저의 정보를 JWT로 기록하여 응답 전달
  },
};

// LoginTicket {
//     envelope:
//      { alg: 'RS256',
//        kid: '4b83f18023a855587f942e75102251120887f725',
//        typ: 'JWT' },
//     payload:
//      { iss: 'accounts.google.com',
//        azp: '439777534288-2ud2dp4a54q0tkdqscd2jpse5a5memf7.apps.googleusercontent.com',
//        aud: '439777534288-2ud2dp4a54q0tkdqscd2jpse5a5memf7.apps.googleusercontent.com',
//        sub: '105520820115500196128',
//        email: 'snaag.dev@gmail.com',
//        email_verified: true,
//        at_hash: 'ajvv95EqfbtGEYq7Ufq78A',
//        name: 'snaag dev',
//        picture: 'https://lh3.googleusercontent.com/a-/AOh14GibvsFxo9L7F8OrXw1ML1ekxFIc9M1hTrxbzmFq3w=s96-c',
//        given_name: 'snaag',
//        family_name: 'dev',
//        locale: 'ko',
//        iat: 1600233714,
//        exp: 1600237314,
//        jti: '82c10bdce2360170ac554f43d2190ad9103332d6' } }
