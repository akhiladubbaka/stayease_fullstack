
const express = require("express");

const router = express.Router();

const { addReview , getReviewsByHotel, getAverageRating,deleteReview, updateReview} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addReview);

router.get("/average/:hotelId", getAverageRating);

router.get("/:hotelId", getReviewsByHotel);

router.put("/:id", protect, updateReview);

router.delete("/:id", protect, deleteReview);

module.exports = router;