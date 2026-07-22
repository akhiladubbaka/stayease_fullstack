const Room = require("../models/Room");

const getRooms = async (req, res) => {

    try {

        const rooms = await Room.find().populate("hotel");

        res.json({
            success: true,
            data: rooms
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const createRoom = async (req, res) => {

    try {

        const room = await Room.create(req.body);

        res.status(201).json({
            success: true,
            data: room
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRoomById = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id).populate("hotel");

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            data: room
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateRoom = async (req, res) => {

    try {

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            data: room
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteRoom = async (req, res) => {

    try {

        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            message: "Room deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRoomsByHotel = async (req, res) => {

    try {

        const rooms = await Room.find({

            hotel: req.params.hotelId

        });

        res.json({

            success: true,
            data: rooms

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom,
    getRoomsByHotel
    
};