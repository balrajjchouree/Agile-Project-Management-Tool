import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CreateStoryModal({ projectId, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const handleSubmit = async () => {
    if (!form.title) {
      return toast.error("Title is required");
    }

    try {
      await API.post("/user-stories", {
        ...form,
        projectId,
      });

      toast.success("Story created!");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to create story");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create User Story</h2>

        <div className="space-y-4">

          <input
            placeholder="Story Title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg cursor-pointer">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}