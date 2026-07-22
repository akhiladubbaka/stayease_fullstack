import { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";
import HotelCard from "../components/HotelCard";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  const fetchHotels = async () => {
    try {
      const data = await getHotels(
        search,
        city,
        rating,
        minPrice,
        maxPrice,
        sort,
        page,
        limit
      );

      setHotels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [search, city, rating, minPrice, maxPrice, sort, page]);

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* Hero Section */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl shadow-xl p-10 text-white mb-10">

        <h1 className="text-5xl font-extrabold">
          🏨 Welcome to StayEase
        </h1>

        <p className="text-xl mt-5 text-blue-100">
          Find your perfect hotel across India.
          Luxury stays • Best Prices • Instant Booking
        </p>

        <div className="mt-8 flex gap-4">

          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
            Explore Hotels
          </button>

          <button className="border border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition">
            Best Deals
          </button>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search Hotels..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters */}

      <div className="bg-white rounded-2xl shadow-lg border p-6 mt-8 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Filter Hotels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 rounded-lg border"
          >
            <option value="">All Cities</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-3 rounded-lg border"
          >
            <option value="">All Ratings</option>
            <option value="4">4+ ⭐</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.8">4.8+ ⭐</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 rounded-lg border"
          >
            <option value="">Sort By</option>
            <option value="price">Price Low → High</option>
            <option value="-price">Price High → Low</option>
            <option value="-rating">Highest Rating</option>
            <option value="name">Name A → Z</option>
          </select>

          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-3 rounded-lg border"
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 rounded-lg border"
          />

        </div>

      </div>

      {/* Hotels */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {hotels.length > 0 ? (

          hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
            />
          ))

        ) : (

          <div className="col-span-3 text-center bg-white rounded-2xl shadow-lg p-10">

            <h2 className="text-3xl font-bold text-gray-600">
              😔 No Hotels Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your filters or search.
            </p>

          </div>

        )}

      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl"
        >
          Previous
        </button>

        <span className="mx-6 text-lg font-bold">
          Page {page}
        </span>

        <button
          disabled={hotels.length < limit}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Hotels;