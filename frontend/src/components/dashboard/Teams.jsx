import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Teams() {
  const [members, setMembers] = useState([]);

  const workspace = JSON.parse(localStorage.getItem("workspace"));

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await API.get(`/projects/${workspace.id}`);

        let allMembers = [];

        res.data.forEach((project) => {
          if (project.teamMembers) {
            allMembers.push(...project.teamMembers);
          }
        });

        const unique = Array.from(
          new Map(allMembers.map((m) => [m.email, m])).values()
        );

        setMembers(unique);
      } catch {
        toast.error("Failed to load team");
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Team Members
        </h2>
        <p className="text-gray-500">
          People working in this workspace
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {members.map((m, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-full text-lg font-semibold mb-3">
              {m.name?.[0]?.toUpperCase()}
            </div>

            <h3 className="font-semibold text-gray-800">
              {m.name}
            </h3>

            <p className="text-sm text-gray-500">
              {m.email}
            </p>

            <p className="text-xs mt-2 text-purple-600">
              Team Member
            </p>
          </div>
        ))}

      </div>

      {members.length === 0 && (
        <p className="text-gray-400 text-center mt-10">
          No team members found
        </p>
      )}
    </div>
  );
}