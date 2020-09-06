module.exports = {
  getAuth: (req, res) => {
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login'],
    });
  },
  authCallback: (req, res) => {
    passport.authenticate('google', { failureRedirect: '/signin' }),
      function (req, res) {
        res.redirect('/main').send({ message: 'google signin success' });
      };
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      req.logout();
      res.redirect('/');
    });
    res.send({ message: 'google signout success' });
  },
};
