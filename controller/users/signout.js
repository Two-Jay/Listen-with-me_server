module.exports = {
  get: (req, res) => {
    let sess = req.session;
    if (sess.userid) {
      sess.destroy((err) => {
        if (err) {
          res.status(500).send({ message: "signout fail, server error" });
        } else {
          res.status(204).send({ message: "signout success" });
        }
      });
    } else {
      res.status(500).send({ message: "signout fail, server error" });
    }
  },
};
