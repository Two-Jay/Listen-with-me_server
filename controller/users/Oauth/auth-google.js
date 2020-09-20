const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_client_id);

const users = require('../../../models').User;


module.exports = {
  post: async (req, res) => {
    let token = req.body.id_token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_client_id,
    });
    const payload = ticket.getPayload();
    users
      .create({
        email: ticket.payload.email,
        nickname: ticket.payload.name,
        profileURL: ticket.payload.picture,
        OauthType: 1,
      })
      .then((user) => {
        if (user) {
          res.status(201).send({
            user: {
              email: user.email,
              nickname: user.nickname,
              profileURL: user.profileURL,
              OauthType: user.OauthType,
            },
            message:
              'Google-auth-signup success, this is first approach as our client',
          });
        } else {
          res
            .status(400)
            .send({ message: 'Google-auth-signin fail, wrong approach' });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Google-auth-signin fail, server error" });
      });
  },
};
