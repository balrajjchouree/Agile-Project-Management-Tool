import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const workspace = JSON.parse(localStorage.getItem("workspace"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get(`/projects/${workspace.id}`);
        setProjects(res.data);
      } catch {
        toast.error("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/dashboard/projects/${p.id}`)}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500">
              {p.description || "No description"}
            </p>

            <div className="mt-3 text-xs text-gray-400">
              {p.priority} priority
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}