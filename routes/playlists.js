const express = require('express');
const router = express.Router();
const { playlistsController } = require('../controller');

router.get('/likedlist', playlistsController.getLikedlist.get);
router.get('/user', playlistsController.getMyList.get);
router.get('', playlistsController.getMostLikedList.get);

router.post('', playlistsController.createPlaylist.post);
router.delete('', playlistsController.removePlaylist.delete);
router.patch('', playlistsController.editPlaylistTitle.patch);

module.exports = router;
