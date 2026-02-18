import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        // Save user + token in context and redirect
        login({ username }, data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed due to a network or server error.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#FF9933] to-[#006699] items-center justify-center px-6 font-sans">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF9933]">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006699] transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006699] transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#006699] text-white py-2 rounded-lg hover:bg-[#004466] transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#FF9933] font-semibold hover:underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
}
