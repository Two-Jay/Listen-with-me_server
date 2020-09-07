const express = require('express');
const router = express.Router();
const { rootController } = require('../controller');
const root = require('../controller/root');

router.get('randomlist', rootController.getRandomPlayList.get);
router.get('music', rootController.getMusics.get);
router.get('likedlist', rootController.getLikeStatus.get);

router.post('along', rootController.ListenAlong.post);

router.patch('audience', rootController.addAudienceAmount.patch);
router.patch('likelist', rootController.addLikeStatus.patch);
router.patch('unlikelist', rootController.removeLikeStatus.patch);

module.exports = router;
