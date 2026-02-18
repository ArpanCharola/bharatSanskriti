// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, form);
      setMessage(res.data.message);
      // Redirect to login page after successful registration
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#FF9933] to-[#006699] items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-[#FF9933]">Sign Up</h1>
        <p className="text-gray-600 text-center mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006699]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006699]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006699]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#006699] text-white py-2 rounded-lg hover:bg-[#004466] transition"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#FF9933] font-semibold hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
