import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav className="bg-slate-900 shadow-lg">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-400"
                >

                    🏨 StayEase

                </Link>

                <div className="flex items-center gap-8 text-white font-medium">

                    <Link
                        to="/"
                        className="hover:text-blue-400 transition"
                    >

                        Home

                    </Link>

                    <Link
                        to="/hotels"
                        className="hover:text-blue-400 transition"
                    >

                        Hotels

                    </Link>

                    {

                        token && (

                            <Link
                                to="/bookings"
                                className="hover:text-blue-400 transition"
                            >

                                My Bookings

                            </Link>

                        )

                    }

                    {

                        user?.role === "admin" && (

                            <Link
                                to="/admin"
                                className="hover:text-blue-400 transition"
                            >

                                Dashboard

                            </Link>

                        )

                    }

                    {

                        !token ? (

                            <>

                                <Link
                                    to="/login"
                                    className="hover:text-blue-400 transition"
                                >

                                    Login

                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                >

                                    Register

                                </Link>

                            </>

                        ) : (

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >

                                Logout

                            </button>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;