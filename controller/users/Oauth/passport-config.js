const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_client_id,
        clientSecret: process.env.GOOGLE_secret_key,
        callbackURL: process.env.GOOGLE_callback_url, // 클라이언트단 주소, 해당 주소를 개발자콘솔 client_callback_url에 등록해야함
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_client_id,
        callbackURL: process.env.KAKAO_callback_url,
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, user);
      }
    )
  );
};
