<<<<<<< HEAD
const { models } = require("../../models");
const users = models.User;

module.exports = {
  patch: (req, res) => {
    let sess = req.session;
    if (sess.userid) {
      users
        .findOne({ where: { nickname: req.body.nickname } })
        .then((data) => {
          if (data) {
            res.status(409).send({
              message: "unavailable nickname, already exists nickname",
            });
          } else {
            users
              .update(
                { nickname: req.body.nickname },
                {
                  where: { id: sess.userid },
                }
              )
              .then(() =>
                res.status(200).send({ message: "nickname update success" })
              )
              .catch(() =>
                res
                  .status(500)
                  .send({ message: "nickname update fail, server error" })
              );
          }
        })
        .catch(() =>
          res
            .status(500)
            .send({ message: "nickname update fail, server error" })
        );
    }
  },
};
=======
// const { user } = require("../../models");
// model definition 이전에 작업하여 해당 라인을 주석처리 함

module.exports = {
  get = (req, res) => {
    const { email } = req.query;

    function ValidateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        users.findOne({
            where : {
                email : email
            }
        }).then((result) => {
            if(result){
              res.status(409).send("unavailable email, already exist email");
              return;                
            } else {
              res.status(200).send("available email");
              return;
            }
        }).catch(
            res.status(500).send("unavailable email, server error")
        )
      } else {
        res.status(400).send("unavailable email, wrong address")
        return;
      }
    }
    ValidateEmail(email);
  }
}
>>>>>>> e2e4b123fae0795ba65aa0a00bdc860cb899e805
