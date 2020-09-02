const express = require('express');
const router = express.Router();
const { usersController } = require('../controller');
const s3 = require('./s3');

router.post('/signin', usersController.signin.post);
router.post('/signup', usersController.signup.post);
router.get('/signout', usersController.signout.get);

router.get('/nickname', usersController.nicknameValidation.get);
router.get('/email', usersController.emailValidation.get);

router.patch('/profile/nickname', usersController.updateNickname.patch);
router.patch('/profile/description', usersController.updateprofileDesc.patch);
router.patch(
  '/profile/image',
  s3.upload.single('file'),
  usersController.updateprofileImage.patch
);

module.exports = router;
