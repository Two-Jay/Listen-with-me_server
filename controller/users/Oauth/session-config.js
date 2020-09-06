const session = require('express-session');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.session_secret,
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: false,
      saveUninitialized: true,
    })
  );
};
