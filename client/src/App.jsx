import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import AdminRooms from "./pages/AdminRooms";
import HotelDetails from "./pages/HotelDetails";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import AdminHotels from "./pages/AdminHotels";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />
     <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route path="/hotels" element={<Hotels />} />
    <Route path="/admin/hotels" element={<AdminHotels />} />
    <Route path="/admin/rooms" element={<AdminRooms />} />

    <Route path="/hotels/:id" element={<HotelDetails />} />

    <Route path="/bookings" element={<Bookings />} />

    <Route path="/profile" element={<Profile />} />

    <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
        <Footer />

<Toaster
position="top-right"
/>

        </div>
        
  );
}

export default App;