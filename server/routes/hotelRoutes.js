const express = require("express");

const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getHotels,createHotel,getHotelById, updateHotel,deleteHotel} = require("../controllers/hotelController");

router.get("/", getHotels);
router.get("/:id", getHotelById);

router.put("/:id",protect, adminOnly, updateHotel);
router.delete("/:id",protect, adminOnly, deleteHotel);
router.post("/",protect, adminOnly, createHotel);


module.exports = router;