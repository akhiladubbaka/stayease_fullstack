function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-3xl font-bold">
              🏨 StayEase
            </h2>

            <p className="mt-4 text-gray-300">
              Find and book your perfect stay across India.
              Luxury hotels, affordable prices, and instant booking.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>Hotels</li>

              <li>Bookings</li>

              <li>Dashboard</li>

              <li>Profile</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-300">
              📧 support@stayease.com
            </p>

            <p className="text-gray-300 mt-2">
              📞 +91 9876543210
            </p>

            <p className="text-gray-300 mt-2">
              📍 Hyderabad, India
            </p>

          </div>

        </div>

        <hr className="my-8 border-gray-700"/>

        <p className="text-center text-gray-400">
          © 2026 StayEase. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;