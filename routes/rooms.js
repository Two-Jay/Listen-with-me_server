const express = require("express");
const router = express.Router();
const { roomsController } = require("../controller");

router.get("", roomsController.getRoomStatus.get);
router.post("", roomsController.createRoom.post);
router.delete("", roomsController.destroyRoom.delete);
router.patch("", roomsController.setCurrentMusic.patch);

router.get("/listener", roomsController.getCurrentListener.get);
router.post("/listener", roomsController.addCurrentListener.post);
router.delete("/listener", roomsController.removeCurrentListener.delete);


router.post("/listener", roomsController.addCurrentListener.post);
router.delete("/listener", roomsController.removeCurrentListener.delete);
router.get("/listener", roomsController.getCurrentListener.get);

module.exports = router;
