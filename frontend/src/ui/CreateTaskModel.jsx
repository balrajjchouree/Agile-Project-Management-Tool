import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CreateTaskModal({ story, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
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
    if (!form.title) {
      return toast.error("Task title is required");
    }

    try {
      await API.post("/tasks", {
        ...form,
        userStoryId: story.id,
      });

      toast.success("Task created!");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-1">Create Task</h2>
        <p className="text-sm text-gray-500 mb-4">
          Story: <span className="text-purple-600">{story.title}</span>
        </p>

        <div className="space-y-4">
          <input
            placeholder="Task Title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Assign To
            </label>

            <select
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              <option value="">Assign user</option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
