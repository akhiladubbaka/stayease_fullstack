const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { createBooking,getBookings,cancelBooking, getMyBookings } = require("../controllers/bookingController");

router.get("/my", protect, getMyBookings);
router.get("/", protect, getBookings);
router.post("/", protect, createBooking);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;