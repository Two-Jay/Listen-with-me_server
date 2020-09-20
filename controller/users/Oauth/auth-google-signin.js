const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_client_id);
const tokenExpireTime = process.env.NODE_ENV === 'production' ? '1d' : '1h';
const jwt = require('jsonwebtoken');
const users = require('../../../models').User;

module.exports = {
  post: async (req, res) => {
    let token = req.body.id_token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    users
      .findOne({
        where: {
          email: ticket.payload.email,
          OauthType: 1,
        },
      })
      .then((user) => {
        let newToken = jwt.sign(
          {
            userid: user.id,
          },
          process.env.JWT_secret,
          {
            expiresIn: tokenExpireTime,
          }
        );
        if (user) {
          res
            .status(200)
            .set('Access-Control-Expose-Headers', 'authorization')
            .set('authorization', `Bearer ${newToken}`)
            .send({
              user: {
                email: user.email,
                nickname: user.nickname,
                profileURL: user.profileURL,
                profileDescription: user.profileDescription,
              },
              message: 'Google-auth-signin success, welcome back',
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
          .send({ message: 'Google-auth-signin fail, server error' });
      });
  },
};
