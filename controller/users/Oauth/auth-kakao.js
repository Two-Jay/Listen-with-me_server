module.exports = {
  getAuth: (req, res) => {
    passport.authenticate('kakao-login');
  },
  authCallback: (req, res) => {
    passport.authenticate('kakao-login', {
      successRedirect: '/main',
      failureRedirect: '/signin',
    });
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      req.logout();
      res.redirect('/');
    });
    res.send({ message: 'kakao signout success' });
  },
};
