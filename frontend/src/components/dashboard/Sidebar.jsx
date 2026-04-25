import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaCheck,
  FaPlus,
  FaHome,
  FaProjectDiagram,
  FaUsers,
  FaBell,
  FaTasks,
} from "react-icons/fa";
import API from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import AgilifyLoader from "../../ui/AgilifyLoader";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await API.get("/workspaces/all-workspace");

        setWorkspaces(res.data);

        const saved = localStorage.getItem("workspace");

        if (saved) {
          const parsed = JSON.parse(saved);

          const valid = res.data.find((ws) => ws.id === parsed.id);

          if (valid) {
            setActiveWorkspace(valid);
            localStorage.setItem("workspace", JSON.stringify(valid));
          } else {
            setActiveWorkspace(res.data[0]);
            localStorage.setItem("workspace", JSON.stringify(res.data[0]));
          }
        } else if (res.data.length > 0) {
          setActiveWorkspace(res.data[0]);
          localStorage.setItem("workspace", JSON.stringify(res.data[0]));
        }
      } catch {
        toast.error("Failed to load workspaces ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        setNotifications(res.data);
      } catch {
        console.log("Notification fetch failed");
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const handleSelectWorkspace = (ws) => {
    setActiveWorkspace(ws);
    localStorage.setItem("workspace", JSON.stringify(ws));

    setOpen(false);
    toast.success(`Switched to ${ws.name}`);
    navigate("/dashboard");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Team",
      path: "/dashboard/teams",
      icon: <FaUsers />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: (
        <div className="relative">
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <AgilifyLoader />;

  return (
    <div className="w-64 h-screen bg-gray-50 border-r p-4 flex flex-col">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-lg font-bold">
            {activeWorkspace?.name?.[0] || "W"}
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-sm">
              {activeWorkspace?.name}
            </h2>
            <p className="text-xs text-gray-500">
              {workspaces.length} workspaces
            </p>
          </div>
        </div>

        <FaChevronDown
          className={`text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute top-20 left-4 w-56 bg-white rounded-xl shadow-xl border p-2 z-10">
          <p className="text-xs text-gray-400 px-2 mb-1">WORKSPACES</p>

          {workspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() => handleSelectWorkspace(ws)}
              className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-purple-500 text-white flex items-center justify-center rounded-md text-xs">
                  {ws.name[0]}
                </div>

                <span className="text-sm">{ws.name}</span>
              </div>

              {activeWorkspace?.id === ws.id && (
                <FaCheck className="text-purple-600 text-xs" />
              )}
            </div>
          ))}

          <button
            onClick={() => navigate("/create-workspace")}
            className="flex items-center gap-2 text-sm text-purple-600 px-2 py-2 mt-2 hover:bg-gray-100 rounded"
          >
            <FaPlus /> Create Workspace
          </button>
        </div>
      )}

      <ul className="space-y-1">
        {menu.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
              location.pathname === item.path
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
      
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
          <div className="flex items-center gap-3 text-gray-700">
            <FaTasks />
            <span>My Tasks</span>
          </div>

          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
            0
          </span>
        </div>
      </div>
    </div>
  );
}