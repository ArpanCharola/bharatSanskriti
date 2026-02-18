// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

// A reusable form component for adding/editing data
const DataForm = ({ type, formData, onFormChange, onFormSubmit, onClose }) => {
  const isEditing = !!formData._id;
  const fields = {
    festivals: ["name", "origin", "type", "description"],
    heritages: ["name", "city", "stateOrUT", "builtIn", "description"],
    traditions: ["name", "origin", "type", "description"],
    users: ["username", "email", "role"],
  };

  const getFields = () => {
    // Only show password field for new users
    if (type === "users" && !isEditing) {
      return [...fields[type], "password"];
    }
    return fields[type] || [];
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? `Edit ${type}` : `Add New ${type}`}</h2>
        <form onSubmit={onFormSubmit}>
          {getFields().map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 capitalize mb-1">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={onFormChange}
                className="w-full p-2 border rounded-lg"
                required
                disabled={isEditing && (field === "username" || field === "email")}
              />
            </div>
          ))}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditing ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("festivals");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Check admin access on component mount
  useEffect(() => {
    if (!user || user.role !== "admin" || !token) {
      setError("Access denied. Redirecting to homepage...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      fetchData();
    }
  }, [user, token, navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = {
        festivals: "api/festivals",
        heritages: "api/heritages",
        traditions: "api/traditions",
        users: "api/admin/users",
      };
      const headers = activeTab === "users" ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_BASE_URL}/${endpoints[activeTab]}`, { headers });
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;
    try {
      const endpoint = activeTab === "users" ? "api/admin/users" : `api/admin/${activeTab}`;
      await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data after deletion
    } catch (err) {
      setError("Failed to delete item.");
      console.error(err);
    }
  };

  const handleAddOrEdit = (item = {}) => {
    setFormData(item);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) { // Edit an existing item
        const endpoint = activeTab === "users" ? "api/admin/users" : `api/admin/${activeTab}`;
        await axios.put(`${API_BASE_URL}/${endpoint}/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else { // Add a new item
        const endpoint = activeTab === "users" ? "api/admin/users" : `api/admin/${activeTab}`;
        await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowForm(false);
      fetchData(); // Refresh data
    } catch (err) {
      setError("Failed to save changes.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["festivals", "heritages", "traditions", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold capitalize">{activeTab} Management</h2>
        {activeTab !== "users" && (
          <button
            onClick={() => handleAddOrEdit({})}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            + Add New
          </button>
        )}
      </div>

      {/* Render Table */}
      {data.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100">
                {Object.keys(data[0])
                  .filter((key) => key !== "_id" && key !== "__v" && key !== "password")
                  .map((key) => (
                    <th key={key} className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </th>
                  ))}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  {Object.keys(item)
                    .filter((key) => key !== "_id" && key !== "__v" && key !== "password")
                    .map((key) => (
                      <td key={key} className="px-5 py-5 border-b border-gray-200 text-sm text-gray-800">
                        {item[key]?.toString().substring(0, 50)}...
                      </td>
                    ))}
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                    <button
                      onClick={() => handleAddOrEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No data found for this category.</p>
      )}

      {/* Form for adding/editing data */}
      {showForm && (
        <DataForm
          type={activeTab}
          formData={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
