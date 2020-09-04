const express = require('express');
const router = express.Router();
const { Controller } = require('../controller');

router.get('/randomlist', Controller.getRandomPlayList.get);
router.post('/along', Controller.ListenAlong.post);

module.exports = router;
