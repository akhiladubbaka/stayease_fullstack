import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../services/bookingService";
import toast from "react-hot-toast";

function Bookings() {

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {

        try {

            const data = await getMyBookings();

            console.log(data);

            setBookings(data.data);

        } catch (error) {

            console.log(error.response?.data || error.message);

        }

    };

    const handleCancel = async (id) => {

    try {

        const data = await cancelBooking(id);

        toast.success(data.message);

        fetchBookings();

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

};

    useEffect(() => {

        fetchBookings();

    }, []);

    return (

<div className="max-w-6xl mx-auto p-8">

<h1 className="text-4xl font-bold text-gray-800 mb-8">

📅 My Bookings

</h1>

{

bookings.length > 0 ? (

bookings.map((booking)=>(

<div

key={booking._id}

className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition"

>

<div className="flex justify-between items-start">

<div>

<h2 className="text-2xl font-bold text-gray-800">

🛏 Room {booking.room.roomNumber}

</h2>

<p className="text-gray-500 mt-2">

{booking.room.type}

</p>

</div>

<span

className={`

px-4

py-2

rounded-full

text-white

font-semibold

${

booking.status==="Booked"

?

"bg-green-500"

:

"bg-red-500"

}

`}

>

{booking.status}

</span>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

<div>

<p className="text-gray-500">

Check-In

</p>

<p className="font-semibold">

{new Date(booking.checkIn).toLocaleDateString()}

</p>

</div>

<div>

<p className="text-gray-500">

Check-Out

</p>

<p className="font-semibold">

{new Date(booking.checkOut).toLocaleDateString()}

</p>

</div>

<div>

<p className="text-gray-500">

Total Price

</p>

<p className="text-2xl font-bold text-blue-600">

₹{booking.totalPrice}

</p>

</div>

</div>

{

booking.status==="Booked" && (

<button

onClick={()=>handleCancel(booking._id)}

className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"

>

Cancel Booking

</button>

)

}

</div>

))

) : (

<div className="bg-white rounded-2xl shadow-lg p-10 text-center">

<h2 className="text-2xl font-bold text-gray-600">

No Bookings Yet 😔

</h2>

<p className="text-gray-500 mt-3">

Book your first hotel and it will appear here.

</p>

</div>

)

}

</div>

);

}



export default Bookings;