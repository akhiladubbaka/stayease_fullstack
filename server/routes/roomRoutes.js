const express = require("express");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { getRooms, createRoom, getRoomById, updateRoom, deleteRoom ,getRoomsByHotel} = require("../controllers/roomController");

router.get("/", getRooms);
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/:id", getRoomById);


router.post("/", protect, adminOnly, createRoom);
router.put("/:id", protect, adminOnly, updateRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;