// src/pages/HeritageDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function HeritageDetail() {
  const { slug } = useParams();
  const [heritage, setHeritage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/heritages/${slug}`);
        if (!res.ok) throw new Error("Not found");
        setHeritage(await res.json());
      } catch (e) {
        console.error("❌ Error fetching heritage:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return (
    <div className="text-center p-10">
      Loading heritage...
    </div>
  );
  if (!heritage) return (
    <div className="text-center p-10 text-red-500">
      Heritage not found.
    </div>
  );

  const lines = (heritage.description || "").split("\n").filter(Boolean);

  return (
    // ✅ Add padding to the main container
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Back to Heritages
        </button>
      </div>

      {/* ✅ Add gap between image and text section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex mb-6">
        <div className="md:w-1/2">
          <img
            src={heritage.media}
            alt={heritage.name}
            className="w-full h-auto object-cover"
            onError={(e) => (e.currentTarget.src = "/placeholder-heritage.jpg")}
          />
        </div>
        {/* ✅ Add padding and spacing to text content */}
        <div className="md:w-1/2 p-6 space-y-4">
          <h1 className="text-3xl font-bold">{heritage.name}</h1>
          <p className="text-gray-600">
            Location: {heritage.city}{heritage.stateOrUT ? `, ${heritage.stateOrUT}` : ""}
          </p>
          {heritage.builtIn && (
            <p className="text-gray-600">
              Built In: {heritage.builtIn}
            </p>
          )}
          {lines.length > 0 && (
            <div className="text-gray-800 space-y-2">
              {lines.map((ln, i) => (
                <p key={i}>{ln}</p>
              ))}
            </div>
          )}
          {heritage.learnMoreLink && (
            <a
              href={heritage.learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
