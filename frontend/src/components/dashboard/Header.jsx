import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        console.log("User fetch failed");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out 👋");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-6 relative">
      <input
        placeholder="Search projects, tasks..."
        readOnly
        className="border px-4 py-2 rounded-lg w-1/2 bg-gray-50 text-gray-500"
      />

      <div className="flex items-center gap-4 relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full cursor-pointer font-semibold"
        >
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>

        {open && (
          <div className="absolute top-14 right-0 w-60 bg-white rounded-xl shadow-xl border p-4 z-20 animate-fadeIn">
            <div className="mb-3">
              <p className="font-semibold text-gray-800">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "email@example.com"}
              </p>
            </div>

            <div className="border-t my-2"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full px-2 py-2 rounded-lg transition cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
