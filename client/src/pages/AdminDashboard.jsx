import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const fetchDashboard = async () => {

        try {

            const data = await getDashboard();

            console.log(data);

            setDashboard(data.data);

        } catch (error) {

            console.log(error.response?.data || error.message);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    if (!dashboard) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-2xl font-bold text-blue-600">

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold text-gray-800 mb-8">

                📊 Admin Dashboard

            </h1>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-blue-500 text-white rounded-2xl p-6 shadow-lg">

                    <h3 className="text-lg">🏨 Hotels</h3>

                    <p className="text-4xl font-bold mt-3">

                        {dashboard.totalHotels}

                    </p>

                </div>

                <div className="bg-green-500 text-white rounded-2xl p-6 shadow-lg">

                    <h3 className="text-lg">🛏 Rooms</h3>

                    <p className="text-4xl font-bold mt-3">

                        {dashboard.totalRooms}

                    </p>

                </div>

                <div className="bg-purple-500 text-white rounded-2xl p-6 shadow-lg">

                    <h3 className="text-lg">📅 Bookings</h3>

                    <p className="text-4xl font-bold mt-3">

                        {dashboard.totalBookings}

                    </p>

                </div>

                <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">

                    <h3 className="text-lg">👤 Users</h3>

                    <p className="text-4xl font-bold mt-3">

                        {dashboard.totalUsers}

                    </p>

                </div>

                <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg md:col-span-2">

                    <h3 className="text-lg">

                        💰 Total Revenue

                    </h3>

                    <p className="text-5xl font-bold mt-4">

                        ₹{dashboard.totalRevenue}

                    </p>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-12">

                <h2 className="text-3xl font-bold text-gray-800 mb-6">

                    Quick Actions

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <Link
                        to="/admin/hotels"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-lg transition duration-300"
                    >

                        <h3 className="text-4xl mb-3">

                            🏨

                        </h3>

                        <h2 className="text-2xl font-bold">

                            Manage Hotels

                        </h2>

                        <p className="mt-2 text-blue-100">

                            Add, Edit & Delete Hotels

                        </p>

                    </Link>

                    <Link
                        to="/admin/rooms"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 shadow-lg transition duration-300"
                    >

                        <h3 className="text-4xl mb-3">

                            🛏️

                        </h3>

                        <h2 className="text-2xl font-bold">

                            Manage Rooms

                        </h2>

                        <p className="mt-2 text-green-100">

                            Add, Edit & Delete Rooms

                        </p>

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;