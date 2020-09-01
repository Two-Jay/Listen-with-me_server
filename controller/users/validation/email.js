const { models } = require("../../../models");
const users = models.User;

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
              res.status(409).send({ message : "unavailable email, already exist email"});
              return;                
            } else {
              res.status(200).send({ message : "available email"});
              return;
            }
        }).catch(
            res.status(500).send({ message : "unavailable email, server error"})
        )
      } else {
        res.status(400).send({ message : "unavailable email, wrong address"})
        return;
      }
    }
    ValidateEmail(email);
  }
}
