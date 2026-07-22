const Review = require("../models/Review");

const addReview = async (req, res) => {

    try {
        const existingReview = await Review.findOne({

    user: req.user._id,
    hotel: req.body.hotel

});

if (existingReview) {

    return res.status(400).json({

        success: false,
        message: "You have already reviewed this hotel"

    });

}

        const review = await Review.create({

            user: req.user._id,
            hotel: req.body.hotel,
            rating: req.body.rating,
            comment: req.body.comment

        });

        res.status(201).json({

            success: true,
            data: review

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getReviewsByHotel = async (req, res) => {

    try {

        const reviews = await Review.find({
            hotel: req.params.hotelId
        }).populate("user", "name email");

        res.json({
            success: true,
            data: reviews
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAverageRating = async (req, res) => {

    try {

        const reviews = await Review.find({
            hotel: req.params.hotelId
        });

        if (reviews.length === 0) {

            return res.json({

                success: true,
                averageRating: 0,
                totalReviews: 0

            });

        }

        let totalRating = 0;

        reviews.forEach((review) => {

            totalRating += review.rating;

        });

        const averageRating = totalRating / reviews.length;

        res.json({

            success: true,
            averageRating,
            totalReviews: reviews.length

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const updateReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({

                success: false,
                message: "Review not found"

            });

        }
        if (review.user.toString() !== req.user._id.toString()) {

    return res.status(403).json({

        success: false,
        message: "You can update only your own review"

    });

}

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        await review.save();

        res.json({

            success: true,
            data: review

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const deleteReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({

                success: false,
                message: "Review not found"

            });

        }

        if (review.user.toString() !== req.user._id.toString()) {

    return res.status(403).json({

        success: false,
        message: "You can delete only your own review"

    });

}

        await review.deleteOne();

        res.json({

            success: true,
            message: "Review deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    addReview,
    getReviewsByHotel,
    getAverageRating,
    updateReview,
    deleteReview
};