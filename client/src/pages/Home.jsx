import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-24 text-center">

          <h1 className="text-6xl font-bold mb-6">
            Find Your Perfect Stay
          </h1>

          <p className="text-xl text-blue-100 mb-10">
            Book luxury hotels at affordable prices across India.
          </p>

          <Link to="/hotels">
            <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100">
              Explore Hotels
            </button>
          </Link>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose StayEase?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🏨</div>
            <h3 className="font-bold text-xl mb-2">
              Luxury Hotels
            </h3>
            <p className="text-gray-500">
              Premium hotels across India.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="font-bold text-xl mb-2">
              Best Prices
            </h3>
            <p className="text-gray-500">
              Affordable stays with amazing offers.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-bold text-xl mb-2">
              Instant Booking
            </h3>
            <p className="text-gray-500">
              Book rooms in seconds.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="font-bold text-xl mb-2">
              Trusted Reviews
            </h3>
            <p className="text-gray-500">
              Real customer ratings.
            </p>
          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-blue-700 text-white py-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center">

          <div>
            <h2 className="text-5xl font-bold">150+</h2>
            <p>Hotels</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">5000+</h2>
            <p>Bookings</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">2500+</h2>
            <p>Happy Customers</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">4.9★</h2>
            <p>Average Rating</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Ready for your next trip?
        </h2>

        <Link to="/hotels">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700">
            Book Now
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;