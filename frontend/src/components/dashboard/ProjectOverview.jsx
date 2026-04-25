export default function ProjectOverview() {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Project Overview</h3>

      <p className="text-gray-600 text-sm">
        Manage your projects, track progress, and collaborate efficiently.
      </p>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded">
          <div className="h-2 bg-purple-600 w-2/3 rounded"></div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Progress overview (static for now)
      </p>
    </div>
  );
}