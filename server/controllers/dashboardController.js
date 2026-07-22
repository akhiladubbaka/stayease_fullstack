const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const User = require("../models/User");


const getDashboard = async (req, res) => {

    try {
        const totalUsers = await User.countDocuments();

        const totalHotels = await Hotel.countDocuments();

        const totalRooms = await Room.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const bookings = await Booking.find({
    status: "Booked"
});

let totalRevenue = 0;

bookings.forEach((booking) => {

    
        totalRevenue += booking.totalPrice;
    

});

        res.json({

            success: true,

            data: {

                totalHotels,
                totalRooms,
                totalBookings,
                totalUsers,
                totalRevenue

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getDashboard,
    
};