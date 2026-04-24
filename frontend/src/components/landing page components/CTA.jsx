import { Link } from "react-router-dom";

export default function CallToActionBanner() {
  return (
    <section className="py-24 px-6 flex justify-center">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b1f1a] to-[#022c22]" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-teal-400/30 blur-3xl"></div>

        <div className="relative text-center text-white px-10 py-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Build, Track, and Deliver Projects <br />
            Without Chaos
          </h2>

          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            A simple workflow to manage tasks, priorities, and teamwork — all in
            one place.
          </p>

          <Link
            to="/login"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
