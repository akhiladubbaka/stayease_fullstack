const Hotel = require("../models/Hotel");
const getHotels = async (req,res)=>{
    
    try{
        console.log(req.query);
        const { city, rating, minPrice, maxPrice,page = 1,limit = 5,sort,search } = req.query;
        const query = {};
        const skip = (Number(page) - 1) * Number(limit);
        if (city) {
    query.city = city;
        } 
        if (rating) {
    query.rating = { $gte: Number(rating) };
        }
        if (minPrice || maxPrice) {

    query.price = {};

    if (minPrice) {
        query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
        query.price.$lte = Number(maxPrice);
    }

}   if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}

        console.log(query);
        let hotelsQuery = Hotel.find(query);

if (sort && sort !== "") {
    hotelsQuery = hotelsQuery.sort(sort);
}

const hotels = await hotelsQuery
    .skip(skip)
    .limit(Number(limit));
        res.json({
            success:true,
            data:hotels
        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }
}

const createHotel = async (req, res) => {

    try {

        const hotel = await Hotel.create(req.body);

        res.status(201).json({
            success: true,
            data: hotel
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

const getHotelById = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        res.json({
            success: true,
            data: hotel
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

const updateHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        res.json({
            success: true,
            data: hotel
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

const deleteHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        res.json({
            success: true,
            message: "Hotel deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    getHotels,
    createHotel,
    getHotelById,
    updateHotel,
    deleteHotel
    
};