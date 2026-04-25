import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa";
import AgilifyLoader from "../ui/AgilifyLoader";

export default function CreateWorkspace() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Workspace name is required ⚠️");
      return;
    }

    try {
      setLoading(true);

      await API.post("/workspaces/create-workspace", {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      });

      toast.success("Workspace created!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Error creating workspace ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <h2 className="text-2xl font-bold text-gray-900">
            Create Workspace
          </h2>
        </div>

        <p className="text-gray-600 mb-6 ml-5">
          Set up your workspace to start managing projects and tasks.
        </p>

        <label className="text-sm font-medium text-gray-700">
          Workspace Name
        </label>

        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-6">
          <FaLayerGroup className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="e.g. My Team Workspace"
            className="w-full outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition flex justify-center items-center cursor-pointer"
        >
          {loading ? (
            <AgilifyLoader fullScreen={false} size={20} label="" />
          ) : (
            "Create Workspace"
          )}
        </button>
      </div>
    </div>
  );
}