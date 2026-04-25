export default function RightPanel({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">

      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-sm text-gray-500">My Tasks</h4>
        <p className="text-xl font-bold">{data.totalTasks}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-sm text-gray-500">Overdue</h4>
        <p className="text-xl font-bold text-red-500">
          {data.overdueTasks}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-sm text-gray-500">Completed</h4>
        <p className="text-xl font-bold text-green-500">
          {data.completedProjects}
        </p>
      </div>

    </div>
  );
}