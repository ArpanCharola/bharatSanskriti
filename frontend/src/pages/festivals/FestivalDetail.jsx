import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function FestivalDetail() {
  const { slug } = useParams();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = searchParams.get("page") || "1";

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/festivals/${slug}`);
        if (!res.ok) throw new Error("Festival not found");
        const data = await res.json();
        setFestival(data);
      } catch (err) {
        console.error("Error fetching festival:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFestival();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading festival...</p>;
  if (!festival) return <p className="text-center py-10">Festival not found.</p>;

  return (
    <div className="px-8 lg:px-16 py-12 bg-gray-50 min-h-screen">
      <Link
        to={`/festivals?page=${currentPage}`}
        className="text-accent hover:underline mb-6 block"
      >
        Back to Festivals
      </Link>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-2/5">
          <img
            src={festival.media}
            alt={festival.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-3/5 p-6 flex flex-col">
          <h1 className="text-4xl font-bold mb-4 text-primary">{festival.name}</h1>
          <p className="text-gray-600 mb-2"><strong>Origin:</strong> {festival.origin}</p>
          <p className="text-gray-600 mb-2"><strong>Type:</strong> {festival.type}</p>
          <p className="text-gray-600 mb-2"><strong>Date:</strong> {festival.date}</p>
          <p className="text-gray-600 mb-2"><strong>Time of Year:</strong> {festival.timeOfYear}</p>
          <p className="text-gray-700 mb-4">{festival.ritualContext}</p>
          <p className="text-gray-700 mb-4">{festival.description}</p>

          {festival.learnMoreLink && (
            <a
              href={festival.learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
