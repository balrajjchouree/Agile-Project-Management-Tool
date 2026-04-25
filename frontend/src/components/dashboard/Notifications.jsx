import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch {
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="text-gray-500">
          Stay updated with your tasks
        </p>
      </div>

      <div className="space-y-3">

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border flex justify-between items-center ${
              n.isRead
                ? "bg-gray-50"
                : "bg-purple-50 border-purple-200"
            }`}
          >
            <div>
              <p className="text-sm font-medium">{n.message}</p>

              <p className="text-xs text-gray-400 mt-1">
                {n.type}
              </p>
            </div>

            {!n.isRead && (
              <button
                onClick={() => markRead(n.id)}
                className="text-xs bg-purple-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No notifications yet
          </p>
        )}
      </div>
    </div>
  );
}