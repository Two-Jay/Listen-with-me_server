module.exports = {
  signin: require('./signin'),
  signup: require('./signup'),
  signout: require('./signout'),
  nicknameValidation: require('./validation/nickname'),
  emailValidation: require('./validation/email'),
  tokenValidation: require('./validation/token'),
  updateNickname: require('./profile/updateNickname'),
  updateprofileDesc: require('./profile/updateProfileDesc'),
  updateprofileImage: require('./profile/updateProfileImage'),
  authgoogle: require('./Oauth/auth-google'),
};
