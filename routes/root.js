const express = require('express');
const router = express.Router();
const { rootController } = require('../controller');

router.get('/randomlist', rootController.getRandomPlayList.get);
router.post('/along', rootController.ListenAlong.post);

module.exports = router;
