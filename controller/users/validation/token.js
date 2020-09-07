module.exports = {
  get: (req, res) => {
    try {
      req.decoded = jwt.verify(req.header.authorization, JWT_secret);
      return res
        .status(200)
        .send({ message: 'verifyToken success, valid token}' });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(403)
          .send({ message: 'verifyToken fail, Token was expired' });
      }
      return res
        .status(400)
        .send({ message: 'verifyToken fail, invalid token' });
    }
  },
};
