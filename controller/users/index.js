module.exports = {
  // 회원 정보 관련
  signin: require('./signin'),
  signup: require('./signup'),
  signout: require('./signout'),
  // server-side validation 관련
  nicknameValidation: require('./validation/nickname'),
  emailValidation: require('./validation/email'),
  tokenValidation: require('./validation/token'),
  // profile 내 정보 수집 및 수정 관련
  updateNickname: require('./profile/updateNickname'),
  updateprofileDesc: require('./profile/updateProfileDesc'),
  updateprofileImage: require('./profile/updateProfileImage'),
  getAllAudienceAmount: require('./profile/getAllAudienceAmount'),
  getAllLikeAmount: require('./profile/getAllLikeAmount'),
  // social login 관련
  authgoogle: require('./Oauth/auth-google'),
  authkakao: require('./Oauth/auth-kakao'),
};
