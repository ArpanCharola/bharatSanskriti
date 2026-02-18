import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function HeritagesList() {
  const [heritages, setHeritages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = 3;

  // Get page from URL, ensuring it's always a valid number
  const getPageFromUrl = () => {
    const pageParam = searchParams.get("page");
    const pageNum = parseInt(pageParam || "1", 10);
    return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
  };

  const [page, setPage] = useState(getPageFromUrl);

  // Fetch heritages once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/heritages`);
        const data = await res.json();
        setHeritages(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("❌ Error fetching heritages:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Sync page state with URL changes (browser back/forward, direct URL access)
  useEffect(() => {
    const urlPage = getPageFromUrl();
    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams, page]);

  // Validate and adjust page when heritages data changes
  useEffect(() => {
    if (heritages.length > 0) {
      const totalPages = Math.max(1, Math.ceil(heritages.length / perPage));
      const currentUrlPage = getPageFromUrl();
      
      // If current page is beyond available pages, redirect to last page
      if (currentUrlPage > totalPages) {
        const validPage = totalPages;
        setPage(validPage);
        setSearchParams({ page: validPage.toString() }, { replace: true });
      } else if (currentUrlPage !== page) {
        // Ensure page state matches URL
        setPage(currentUrlPage);
      }
    }
  }, [heritages, setSearchParams, page]);

  const totalPages = Math.max(1, Math.ceil(heritages.length / perPage));
  const start = (page - 1) * perPage;
  const current = heritages.slice(start, start + perPage);

  // Update URL when page changes (preserve history for back button)
  const goToPage = (newPage) => {
    const validPage = Math.max(1, Math.min(totalPages, newPage));
    setPage(validPage);
    setSearchParams({ page: validPage.toString() });
  };

  if (loading) return <p className="text-center py-10">Loading heritages…</p>;

  if (heritages.length === 0) {
    return (
      <div className="px-8 lg:px-16 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Indian Heritage Sites</h1>
        <p className="text-gray-600">
          No heritages yet. Seed with <code>POST /api/heritages/seed</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="px-8 lg:px-16 py-12 text-center">
      <h1 className="text-4xl font-bold text-primary mb-12">Indian Heritage Sites</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {current.map((h) => (
          <div key={h._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
            <img
              src={h.media || "/placeholder-heritage.jpg"}
              alt={h.name}
              className="w-full h-56 object-cover"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/placeholder-heritage.jpg")}
            />
            <div className="p-6 text-left">
              <h2 className="text-2xl font-bold text-primary mb-1">{h.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                📍 {h.city}{h.stateOrUT ? `, ${h.stateOrUT}` : ""}{h.builtIn ? ` • 🕰 ${h.builtIn}` : ""}
              </p>
              <p className="text-gray-700 mb-4">{(h.description || "").split("\n")[0]}</p>
              <Link 
                to={`/heritages/${h.slug}`} 
                className="text-accent font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀ Prev
        </button>
        <span className="text-lg font-semibold">{page} of {totalPages}</span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
