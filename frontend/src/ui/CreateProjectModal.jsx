import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function CreateProjectModal({ onClose, onSuccess }) {
  const [workspace, setWorkspace] = useState(null);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    endDate: "",
    projectLead: "",
    teamMembers: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("workspace");
    if (stored) setWorkspace(JSON.parse(stored));


    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users");
        setUsers(res.data);
      } catch {
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.name) return toast.error("Project name required");
    if (!workspace?.id) return toast.error("Workspace not selected");

    try {
      await API.post("/projects", {
        ...form,
        workspaceId: workspace.id,
      });

      toast.success("Project created!");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to create project");
    }
  };

  const addMember = (user) => {
    if (!form.teamMembers.find((u) => u.id === user.id)) {
      setForm({
        ...form,
        teamMembers: [...form.teamMembers, user],
      });
    }
  };

  const removeMember = (id) => {
    setForm({
      ...form,
      teamMembers: form.teamMembers.filter((u) => u.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative">

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">Create New Project</h2>
        <p className="text-sm text-gray-500 mb-6">
          Workspace: <span className="text-purple-600">{workspace?.name}</span>
        </p>

        <div className="space-y-4">

          <input
            placeholder="Project Name"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Planning</option>
              <option>Active</option>
              <option>Completed</option>
            </select>

            <select
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Project Lead</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => setForm({ ...form, projectLead: e.target.value })}
            >
              <option value="">Select Lead</option>
              {users.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Team Members</label>

            <select
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => {
                const user = users.find((u) => u.id == e.target.value);
                if (user) addMember(user);
              }}
            >
              <option>Select Members</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-3">
              {form.teamMembers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {u.name}
                  <FaTimes
                    className="cursor-pointer text-xs"
                    onClick={() => removeMember(u.id)}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg cursor-pointer">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}