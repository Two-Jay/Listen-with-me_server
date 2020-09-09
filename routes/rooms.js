const express = require("express");
const router = express.Router();
const { roomsController } = require("../controller");

router.get("", roomsController.getRoomStatus.get);
router.post("", roomsController.createRoom.post);
router.delete("", roomsController.destroyRoom.delete);
router.patch("", roomsController.setCurrentMusic.patch);

router.get("/listener", roomsController.currentListener.get);
router.post("/listener", roomsController.currentListener.post);
router.delete("/listener", roomsController.currentListener.delete);

module.exports = router;
