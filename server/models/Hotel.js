const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    rating:{
        type:Number,
        default:0
    }

});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;