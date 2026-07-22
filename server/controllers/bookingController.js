const Booking = require("../models/Booking");
const Room = require("../models/Room");

const createBooking = async (req, res) => {

    try {

        const room = await Room.findById(req.body.room);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        if (!room.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Room is already booked"
            });
        }

        const checkIn = new Date(req.body.checkIn);
        const checkOut = new Date(req.body.checkOut);

        const today = new Date();
today.setHours(0,0,0,0);

if (checkIn < today) {
    return res.status(400).json({
        success:false,
        message:"Check-In date cannot be in the past"
    });
}

if (checkOut <= checkIn) {
    return res.status(400).json({
        success:false,
        message:"Check-Out must be after Check-In"
    });
}
        const existingBooking = await Booking.findOne({

    room: req.body.room,

    status: "Booked",

    checkIn: { $lt: checkOut },

    checkOut: { $gt: checkIn }

});

if (existingBooking) {

    return res.status(400).json({

        success: false,

        message: "Room already booked for selected dates"

    });

}
        const booking = await Booking.create({
            user: req.user._id,
            room: req.body.room,
            checkIn,
            checkOut,
            totalPrice: req.body.totalPrice
        });

        room.isAvailable = false;
        await room.save();

        return res.status(201).json({
            success: true,
            data: booking
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


const getBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("room");

        res.json({
            success: true,
            data: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const room = await Room.findById(booking.room);

        booking.status = "Cancelled";

        room.isAvailable = true;

        await booking.save();
        await room.save();

        res.json({
            success: true,
            message: "Booking cancelled successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user._id
        })
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .populate("room");

        res.json({
            success: true,
            data: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createBooking,
    getBookings,
    cancelBooking,
    getMyBookings
};