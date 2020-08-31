const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

router.post('/signin', usersController.signin.post);
router.post('/signup', usersController.signup.post);
router.get('/signout', usersController.signout.get);

router.get('/nickname', usersController.nicknameValidation.get);
router.get('/email', usersController.emailValidation.get);
