import { useEffect, useState } from "react";
import { getHotels , deleteHotel, updateHotel, createHotel} from "../services/hotelService";
import toast from "react-hot-toast";

function AdminHotels() {

    const [hotels, setHotels] = useState([]);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");

    const fetchHotels = async () => {

        try {

            const data = await getHotels("", "", "", "", "", "", 1, 100);

            setHotels(data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this hotel?");

    if (!confirmDelete) {

        return;

    }

    try {

        await deleteHotel(id);

        toast.success("Hotel Deleted Successfully");

        fetchHotels();

    } catch (error) {

        console.log(error.response?.data || error.message);

        toast.error(error.response?.data?.message || "Delete Failed");

    }

};

const handleEdit = async (hotel) => {

    const name = prompt("Hotel Name", hotel.name);

    const city = prompt("City", hotel.city);

    const price = prompt("Price", hotel.price);

    const rating = prompt("Rating", hotel.rating);

    if (!name || !city || !price || !rating) {

        return;

    }

    try {

        await updateHotel(hotel._id, {

            name,
            city,
            price,
            rating

        });

        toast.success("Hotel Updated Successfully");

        fetchHotels();

    }

    catch (error) {

        console.log(error.response?.data || error.message);

    }

};

const handleAddHotel = async () => {

    if (!name || !city || !price || !rating) {

        atoast.error("Please fill all fields");

        return;

    }

    try {

        await createHotel({

            name,
            city,
            price,
            rating

        });

        toast.success("Hotel Added Successfully");

        setName("");
        setCity("");
        setPrice("");
        setRating("");

        fetchHotels();

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

};

    useEffect(() => {

        fetchHotels();

    }, []);

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1>Manage Hotels</h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

<h2 className="text-2xl font-bold mb-5">

Add New Hotel

</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
placeholder="Hotel Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border rounded-lg p-3"
/>

<input
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
className="border rounded-lg p-3"
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="border rounded-lg p-3"
/>

<input
placeholder="Rating"
value={rating}
onChange={(e)=>setRating(e.target.value)}
className="border rounded-lg p-3"
/>

</div>

<button

onClick={handleAddHotel}

className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

>

Add Hotel

</button>

</div>

            

            {

                hotels.map((hotel) => (

                    <div
                        key={hotel._id}
                        style={{
                            border: "1px solid gray",
                            padding: "15px",
                            margin: "10px",
                            borderRadius: "8px"
                        }}
                    >

                        <h3>{hotel.name}</h3>

                        <p>City : {hotel.city}</p>

                        <p>Price : ₹{hotel.price}</p>

                        <p>Rating : ⭐ {hotel.rating}</p>

                        <button
    onClick={() => handleEdit(hotel)}
>

    Edit

</button>

                       <button
    style={{ marginLeft: "10px" }}
    onClick={() => handleDelete(hotel._id)}
>
    Delete
</button>

                    </div>

                ))

            }

        </div>

    );

}

export default AdminHotels;