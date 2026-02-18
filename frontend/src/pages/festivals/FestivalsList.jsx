// src/components/FestivalList.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export default function FestivalsList() {
  const [festivals, setFestivals] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = 3; // show 3 cards per page

  // Get the current page from the URL search params, defaulting to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/festivals`)
      .then((res) => setFestivals(res.data))
      .catch((err) => console.error("Error fetching festivals:", err));
  }, []);

  // Pagination logic remains the same
  const totalPages = Math.ceil(festivals.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentFestivals = festivals.slice(startIndex, startIndex + perPage);

  // Function to update the page number in the URL
  const handlePageChange = (page) => {
    setSearchParams({ page: page });
    // This will automatically re-render the component with the new currentPage
  };

  return (
    <div className="px-8 lg:px-16 py-12 text-center">
      <h1 className="text-4xl font-bold text-primary mb-12">Festivals of India</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentFestivals.map((festival) => (
          <div
            key={festival._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={festival.media}
              alt={festival.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-2">{festival.name}</h2>
              <p className="text-gray-600 mb-4">{festival.description.substring(0, 100)}...</p>
              <Link
                to={`/festivals/${festival.slug}?page=${currentPage}`}
                className="text-accent font-semibold hover:underline"
              >
                Learn More -&gt;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
