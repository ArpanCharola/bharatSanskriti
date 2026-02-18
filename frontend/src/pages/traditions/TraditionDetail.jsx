import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function TraditionDetail() {
  const { slug } = useParams();
  const [tradition, setTradition] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradition = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/traditions/${slug}`);
        if (!res.ok) throw new Error("Tradition not found");
        const data = await res.json();
        setTradition(data);
      } catch (err) {
        console.error("Error fetching tradition:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTradition();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading tradition...</p>;
  if (!tradition) return <p className="text-center py-10">Tradition not found.</p>;

  return (
    <div className="px-8 lg:px-16 py-12 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="text-accent hover:underline mb-6 block"
      >
        Back to Traditions
      </button>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-2/5">
          <img
            src={tradition.media}
            alt={tradition.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-3/5 p-6 flex flex-col">
          <h1 className="text-4xl font-bold mb-4 text-primary">{tradition.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Origin:</strong> {tradition.origin}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Type:</strong> {tradition.type}
          </p>
          <p className="text-gray-700 mb-4">{tradition.culturalContext}</p>
          <p className="text-gray-700 mb-4">{tradition.description}</p>

          {tradition.learnMoreLink && (
            <a
              href={tradition.learnMoreLink}
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
