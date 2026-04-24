export default function DashboardPreview() {
  return (
    <section className="py-28 px-6 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-200 via-pink-100 to-orange-100 blur-3xl opacity-40"></div>

      <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>

          <div className="ml-4 flex-1 bg-gray-200 h-6 rounded-md flex items-center justify-center px-3 text-xs text-gray-500">
            yourapp.local/dashboard
          </div>
        </div>

        <div className="p-4 bg-gray-50">
          <img
            src="/dashboard.png"
            alt="Dashboard Preview"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
