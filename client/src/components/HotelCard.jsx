import { Link } from "react-router-dom";

function HotelCard({ hotel }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">

            {/* Top Section */}

            <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800">

                    🏨 {hotel.name}

                </h2>

                <p className="text-gray-500 mt-2">

                    📍 {hotel.city}

                </p>

                <div className="flex justify-between items-center mt-6">

                    <div>

                        <p className="text-yellow-500 font-semibold text-lg">

                            ⭐ {hotel.rating}

                        </p>

                    </div>

                    <div>

                        <p className="text-2xl font-bold text-blue-600">

                            ₹{hotel.price}

                        </p>

                        <p className="text-sm text-gray-500">

                            per night

                        </p>

                    </div>

                </div>

            </div>

            {/* Bottom Section */}

            <div className="bg-gray-100 px-6 py-4">

                <Link to={`/hotels/${hotel._id}`}>

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >

                        View Details

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default HotelCard;