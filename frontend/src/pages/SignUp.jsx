import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      await API.post("/auth/register", form);
      toast.success("Account Created Successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex gap-2 mb-4">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <h2 className="text-3xl font-bold text-gray-900">
            Create New Account
          </h2>
        </div>

        <p className="text-gray-600 mb-6 ml-5">
          Sign up to start managing your projects and collaborating with your
          team.
        </p>

        <label className="text-sm font-medium text-gray-700">Name</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-4">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Agilify Com"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <label className="text-sm font-medium text-gray-700">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-4">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-6">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
