import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export default function TraditionsList() {
  const [traditions, setTraditions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = 3;

  // Get current page from URL or session storage, default to 1
  const currentPageFromUrl = parseInt(
    searchParams.get("page") || sessionStorage.getItem("traditionsPage") || "1",
    10
  );
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    // Save current page to session storage on every page change
    sessionStorage.setItem("traditionsPage", currentPage);
    setSearchParams({ page: currentPage });

    axios
      .get(`${API_BASE_URL}/api/traditions`)
      .then((res) => setTraditions(res.data))
      .catch((err) => console.error("Error fetching traditions:", err));
  }, [currentPage, setSearchParams]);

  const totalPages = Math.ceil(traditions.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentTraditions = traditions.slice(startIndex, startIndex + perPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="px-8 lg:px-16 py-12 text-center">
      <h1 className="text-4xl font-bold text-primary mb-12">Indian Traditions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {currentTraditions.map((tradition) => (
          <div
            key={tradition._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={tradition.media}
              alt={tradition.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-2">{tradition.name}</h2>
              <p className="text-gray-600 mb-4">
                {tradition.culturalContext.substring(0, 100)}...
              </p>
              <Link to={`/traditions/${tradition.slug}`} className="text-accent font-semibold hover:underline">
                Learn More -&gt;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
