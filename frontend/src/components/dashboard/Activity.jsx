import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Activity() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const workspace = JSON.parse(localStorage.getItem("workspace"));

        const res = await API.get(`/projects/${workspace.id}`);

        let allTasks = [];

        for (let p of res.data) {
          const stories = await API.get(`/user-stories/${p.id}`);

          for (let s of stories.data) {
            const t = await API.get(`/tasks/${s.id}`);
            allTasks.push(...t.data);
          }
        }

        setTasks(allTasks.slice(0, 5)); // last 5
      } catch {
        console.log("Activity error");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Recent Activity</h3>

      <div className="space-y-2 text-sm">
        {tasks.map((t) => (
          <div key={t.id} className="flex justify-between">
            <span>{t.title}</span>
            <span className="text-gray-400">{t.status}</span>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-gray-400">No activity</p>
        )}
      </div>
    </div>
  );
}