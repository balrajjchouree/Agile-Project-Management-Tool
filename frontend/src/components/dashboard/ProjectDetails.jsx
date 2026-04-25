import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import CreateStoryModal from "../../ui/CreateStoryModal";
import CreateTaskModal from "../../ui/CreateTaskModel";

export default function ProjectDetails() {
  const { id } = useParams();

  const [stories, setStories] = useState([]);
  const [tasksMap, setTasksMap] = useState({});

  const [openStoryModal, setOpenStoryModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const fetchStories = async () => {
    try {
      const res = await API.get(`/user-stories/${id}`);
      setStories(res.data);

      res.data.forEach((story) => fetchTasks(story.id));
    } catch {
      toast.error("Failed to load stories");
    }
  };

  const fetchTasks = async (storyId) => {
    try {
      const res = await API.get(`/tasks/${storyId}`);

      setTasksMap((prev) => ({
        ...prev,
        [storyId]: res.data,
      }));
    } catch {
      console.log("Task fetch error");
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Stories</h2>

        <button
          onClick={() => setOpenStoryModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Story
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {stories.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-sm text-gray-500">{s.description}</p>

            <div className="mt-2 text-xs bg-gray-100 inline-block px-2 py-1 rounded">
              {s.status}
            </div>

            <div className="mt-4 space-y-3">
              {tasksMap[s.id]?.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 p-3 rounded-lg border hover:shadow-sm transition"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{task.title}</h4>

                    <select
                      value={task.status}
                      onChange={async (e) => {
                        try {
                          await API.put(`/tasks/${task.id}`, {
                            status: e.target.value,
                          });

                          fetchTasks(s.id);
                          toast.success("Status updated");
                        } catch {
                          toast.error("Failed");
                        }
                      }}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="text-xs text-gray-500 mt-1 flex justify-between">
                    <span>{task.priority}</span>
                    <span>{task.assignedTo || "Unassigned"}</span>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={async () => {
                        try {
                          await API.delete(`/tasks/${task.id}`);
                          fetchTasks(s.id);
                          toast.success("Deleted");
                        } catch {
                          toast.error("Not allowed");
                        }
                      }}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedStory(s);
                setOpenTaskModal(true);
              }}
              className="mt-3 text-sm text-purple-600 hover:underline cursor-pointer"
            >
              + Add Task
            </button>
          </div>
        ))}
      </div>

      {openStoryModal && (
        <CreateStoryModal
          projectId={id}
          onClose={() => setOpenStoryModal(false)}
          onSuccess={fetchStories}
        />
      )}

      {openTaskModal && (
        <CreateTaskModal
          story={selectedStory}
          onClose={() => setOpenTaskModal(false)}
          onSuccess={() => fetchTasks(selectedStory.id)}
        />
      )}
    </div>
  );
}
