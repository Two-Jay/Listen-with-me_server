// const { user } = require("../../models");
// model definition 이전에 작업하여 해당 라인을 주석처리 함

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    let sess = req.session;

    users
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((result) => {
        if (result === null) {
          res.status(404).send('signin fail, invalid user data');
        } else {
          sess.userid = result.id;

          res.status(200).json({
            email: result.email,
            nickname: result.nickname,
            profileURL: result.profileURL,
            profileDescription: result.profileDescription,
          });
        }
      })
      .catch((err) => {
        res.status(404).send('signin fail, server error');
      });
  },
};
