const express = require("express");
const router = express.Router();
const { roomsController } = require("../controller");

router.get("", roomsController.getRoomStatus.get);
router.post("", roomsController.createRoom.post);
router.delete("", roomsController.destroyRoom.delete);
router.patch("", roomsController.setCurrentMusic.patch);

router.get("/listener/playlist", roomsController.getCurrentListener.get);
router.post("/listener/playlist", roomsController.addCurrentListener.post);
router.delete(
  "/listener/playlist",
  roomsController.removeCurrentListener.delete
);

module.exports = router;
