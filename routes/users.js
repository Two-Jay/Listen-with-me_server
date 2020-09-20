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
router.post(
  '/profile/image',
  s3.upload.single('file'),
  usersController.updateprofileImage.post
);

router.get('/profile/audience', usersController.getAllAudienceAmount.get);
router.get('/profile/like', usersController.getAllLikeAmount.get);

router.post('./oauth/google', usersController.authgoogle.post);
router.post('/oauth/google-signin', usersController.authgoogleSignin.post);

module.exports = router;
