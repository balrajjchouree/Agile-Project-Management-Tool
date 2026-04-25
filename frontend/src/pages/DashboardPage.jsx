import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

import StatsCards from "../components/dashboard/StatsCards";
import ProjectOverview from "../components/dashboard/ProjectOverview";
import Activity from "../components/dashboard/Activity";
import RightPanel from "../components/dashboard/RightPanel";
import CreateProjectModal from "../ui/CreateProjectModal";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        toast.error("Failed to load user");
      }
    };

    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setDashboard(res.data);
      } catch {
        toast.error("Failed to load dashboard");
      }
    };

    fetchUser();
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"}
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your projects today
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg cursor-pointer"
        >
          + New Project
        </button>
      </div>

      <StatsCards data={dashboard} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectOverview />
          <Activity />
        </div>

        <RightPanel data={dashboard} />
      </div>

      {openModal && (
        <CreateProjectModal
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            console.log("refresh projects next");
          }}
        />
      )}
    </div>
  );
}
