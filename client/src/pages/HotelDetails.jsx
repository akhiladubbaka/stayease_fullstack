import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../services/hotelService";
import { getRoomsByHotel } from "../services/roomService";
import { createBooking } from "../services/bookingService";
import toast from "react-hot-toast";
import {
    addReview,
    getReviewsByHotel,
    getAverageRating
} from "../services/reviewService";

function HotelDetails() {

    const { id } = useParams();

    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);

    const fetchHotel = async () => {

        try {

            const data = await getHotelById(id);

            console.log(data.data);

            setHotel(data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchRooms = async () => {

    try {

        const data = await getRoomsByHotel(id);

        console.log(data.data);

        setRooms(data.data);

    } catch (error) {

        console.log(error);

    }

};

const fetchReviews = async () => {

    try {

        const data = await getReviewsByHotel(id);

        setReviews(data.data);

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

};

const fetchAverageRating = async () => {

    try {

        const data = await getAverageRating(id);

        setAverageRating(data.averageRating);

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

};
const handleBooking = async (room) => {
    console.log("Room Received:", room);

    try {

       if (!checkIn || !checkOut) {

    toast.error("Please select Check-In and Check-Out dates");

    return;

}
       const inDate = new Date(checkIn);
const outDate = new Date(checkOut);

const totalDays = (outDate - inDate) / (1000 * 60 * 60 * 24);

if (totalDays <= 0) {

    toast.error("Check-Out must be after Check-In");

    return;

}

const totalPrice = room.price * totalDays;

        const data = await createBooking({

            room: room._id,
            checkIn,
            checkOut,
            totalPrice

        });

        console.log(data);

        toast.success("Booking Successful!");

    } catch (error) {

        console.log(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Booking Failed");

    }

};

const handleReviewSubmit = async () => {

    try {

        await addReview({

            hotel: id,
            rating,
            comment

        });

        toast.success("Review Added Successfully!");

        setComment("");
        setRating(5);

        fetchReviews();
        fetchAverageRating();

    } catch (error) {

        console.log(error.response?.data || error.message);

        toast.error(error.response?.data?.message || "Failed to add review");

    }

};

    useEffect(() => {

    fetchHotel();

    fetchRooms();

    fetchReviews();
    fetchAverageRating();

}, []);

    if (!hotel) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

<h1 className="text-4xl font-bold text-gray-800">

🏨 {hotel.name}

</h1>

<p className="text-gray-500 mt-2 text-lg">

📍 {hotel.city}

</p>

<div className="flex justify-between items-center mt-6">

<div>

<p className="text-yellow-500 text-xl font-semibold">

⭐ {hotel.rating}

</p>

</div>

<div>

<p className="text-3xl font-bold text-blue-600">

₹{hotel.price}

</p>

<p className="text-gray-500">

Starting Price

</p>

</div>

</div>

</div>

            <hr />

<div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-8">

<h2 className="text-2xl font-bold text-yellow-700">

⭐ Average Rating : {averageRating.toFixed(1)}

</h2>

</div>
<h2 className="text-2xl font-bold mb-5">

Write a Review

</h2>

<select className="border rounded-lg p-3"
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
</select>

<br /><br />

<textarea className="w-full border rounded-lg p-4"
rows={4}
    placeholder="Write your review..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
/>

<br /><br />

<button onClick={handleReviewSubmit} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">

    Submit Review

</button>

<hr />

<h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">

Available Rooms

</h2>
<br />

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

<h3 className="text-xl font-semibold mb-5">

Select Your Stay

</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div>

<label className="block mb-2 font-medium">

Check-In

</label>

<input

type="date"

value={checkIn}

onChange={(e)=>setCheckIn(e.target.value)}

className="w-full border rounded-lg p-3"

/>

</div>

<div>

<label className="block mb-2 font-medium">

Check-Out

</label>

<input

type="date"

value={checkOut}

onChange={(e)=>setCheckOut(e.target.value)}

className="w-full border rounded-lg p-3"

/>

</div>

</div>

</div>

{

    rooms.map((room) => (

        <div

key={room._id}

className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-2xl transition"

>

            <h3 className="text-2xl font-bold text-gray-800">

🛏 Room {room.roomNumber}

</h3>

            <p className="mt-3">

<strong>Type :</strong> {room.type}

</p>

<p>

<strong>Price :</strong>

<span className="text-blue-600 font-bold">

₹{room.price}

</span>

</p>

<p>

<strong>Capacity :</strong>

👥 {room.capacity} Persons

</p>
            {
checkIn &&
checkOut &&
(new Date(checkOut) > new Date(checkIn)) && (

<p className="text-green-600 font-bold text-lg mt-3">

Total Price :

₹{

room.price *

(

(new Date(checkOut)-new Date(checkIn))

/

(1000*60*60*24)

)

}

</p>

)
}

            <p className="mt-3 font-semibold">

{

room.isAvailable

?

"✅ Available"

:

"❌ Already Booked"

}

</p>

            <button

disabled={!room.isAvailable}

onClick={()=>handleBooking(room)}

className={`

mt-5

w-full

py-3

rounded-xl

font-semibold

text-white

${

room.isAvailable

?

"bg-blue-600 hover:bg-blue-700"

:

"bg-gray-400 cursor-not-allowed"

}

`}

>
    {room.isAvailable ? "Book Now" : "Already Booked"}
</button>

        </div>

    ))

}

<hr />

<h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">

Customer Reviews

</h2>

{

    reviews.length > 0 ? (

reviews.map((review)=>(

<div

key={review._id}

className="bg-white rounded-2xl shadow-md p-6 mb-5"

>

<div className="flex justify-between items-center">

<h3 className="text-yellow-500 text-xl font-bold">

⭐ {review.rating}/5

</h3>

<p className="text-gray-400 text-sm">

{new Date(review.createdAt).toLocaleDateString()}

</p>

</div>

<p className="mt-4 text-gray-700">

"{review.comment}"

</p>

<div className="mt-5 flex items-center gap-3">

<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

{review.user.name.charAt(0).toUpperCase()}

</div>

<div>

<p className="font-semibold">

{review.user.name}

</p>

<p className="text-gray-500 text-sm">

Verified Guest

</p>

</div>

</div>

</div>

))

) : (

<div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">

No Reviews Yet.

Be the first one to review this hotel!

</div>

)

}

        </div>

    );

}



export default HotelDetails;