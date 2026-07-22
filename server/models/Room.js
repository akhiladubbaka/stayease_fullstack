const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

    roomNumber: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    }

});

module.exports = mongoose.model("Room", roomSchema);