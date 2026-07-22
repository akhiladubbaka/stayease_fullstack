import { useEffect, useState } from "react";
import {
  getRooms,
  deleteRoom,
  updateRoom,
  createRoom,
} from "../services/roomService";
import toast from "react-hot-toast";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this room?");

    if (!confirmDelete) return;

    try {
      await deleteRoom(id);
     toast.success("Room Deleted Successfully");
      fetchRooms();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = async (room) => {
    const roomNumber = prompt("Room Number", room.roomNumber);
    const type = prompt("Room Type", room.type);
    const price = prompt("Price", room.price);
    const capacity = prompt("Capacity", room.capacity);

    if (!roomNumber || !type || !price || !capacity) return;

    try {
      await updateRoom(room._id, {
        roomNumber,
        type,
        price,
        capacity,
      });

      toast.success("Room Updated Successfully");
      fetchRooms();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  const handleAdd = async () => {
    const roomNumber = prompt("Room Number");
    const type = prompt("Room Type");
    const price = prompt("Price");
    const capacity = prompt("Capacity");
    const hotelId = prompt("Hotel ID");

    if (!roomNumber || !type || !price || !capacity || !hotelId) return;

    try {
      await createRoom({
        roomNumber,
        type,
        price,
        capacity,
        hotel: hotelId,
      });

      toast.success("Room Added Successfully");
      fetchRooms();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          🛏 Manage Rooms
        </h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
        >
          + Add Room
        </button>

      </div>

      {rooms.map((room) => (

        <div
          key={room._id}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold mb-5">
            🛏 Room {room.roomNumber}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">Room Type</p>
              <p className="font-semibold">{room.type}</p>
            </div>

            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-bold text-blue-600">
                ₹{room.price}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Capacity</p>
              <p>👥 {room.capacity} Persons</p>
            </div>

            <div>
              <p className="text-gray-500">Hotel</p>
              <p>🏨 {room.hotel.name}</p>
            </div>

            <div>
              <p className="text-gray-500">City</p>
              <p>📍 {room.hotel.city}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>

              <p
                className={`font-bold ${
                  room.isAvailable
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {room.isAvailable
                  ? "✅ Available"
                  : "❌ Booked"}
              </p>
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => handleEdit(room)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(room._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default AdminRooms;