export default function StatsCards({ data }) {
  if (!data) return null;

  const cards = [
    { title: "Total Projects", value: data.totalProjects },
    { title: "Completed", value: data.completedProjects },
    { title: "Tasks", value: data.totalTasks },
    { title: "Overdue", value: data.overdueTasks },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">{c.title}</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}