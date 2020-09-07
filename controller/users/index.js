module.exports = {
  // 회원가입 관련 api
  signin: require('./signin'),
  signup: require('./signup'),
  signout: require('./signout'),
  // 유효성 검사 관련 api
  nicknameValidation: require('./validation/nickname'),
  emailValidation: require('./validation/email'),
  tokenValidation: require('./validation/token'),
  // 프로필 수정 관련 api
  updateNickname: require('./profile/updateNickname'),
  updateprofileDesc: require('./profile/updateProfileDesc'),
  updateprofileImage: require('./profile/updateProfileImage'),
  // Oauth social login 관련 api
  authgoogle: require('./Oauth/auth-google'),
  authkakao: require('./Oauth/auth-kakao'),
};
