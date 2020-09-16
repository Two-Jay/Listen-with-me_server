const express = require('express');
const router = express.Router();
const { usersController } = require('../controller');
const s3 = require('./s3');

router.post('/signin', usersController.signin.post);
router.post('/signup', usersController.signup.post);
router.get('/signout', usersController.signout.get);

router.get('/nickname', usersController.nicknameValidation.get);
router.get('/email', usersController.emailValidation.get);
router.get('/token', usersController.tokenValidation.get);
router.get('/password', usersController.passwordValidation.get);

router.patch('/profile/nickname', usersController.updateNickname.patch);
router.patch('/profile/description', usersController.updateprofileDesc.patch);
router.patch(
  '/profile/image',
  s3.upload.single('file'),
  usersController.updateprofileImage.patch
);

router.get('/profile/audience', usersController.getAllAudienceAmount.get);
router.get('/profile/like', usersController.getAllLikeAmount.get);

router.get('./oauth/google', usersController.authgoogle.getAuth);
router.get('./oauth/google/callback', usersController.authgoogle.authCallback);
router.get('./oauth/google/logout', usersController.authgoogle.logout);

router.get('./oauth/kakao', usersController.authkakao.getAuth);
router.get('./oauth/kakao/callback', usersController.authkakao.authCallback);
router.get('./oauth/kakao/logout', usersController.authgoogle.logout);

module.exports = router;
