export default function Hero() {
  return (
    <div className="text-center py-28 px-6">
      <h1 className="text-5xl font-bold text-gray-900 leading-tight">
        Manage your projects <br />
        the Agile way with <span className="text-purple-600">Agilify</span>
      </h1>

      <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
        Plan, track, and collaborate seamlessly with your team using a simple and powerful workflow.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
          Get Started
        </button>
      </div>
    </div>
  );
}