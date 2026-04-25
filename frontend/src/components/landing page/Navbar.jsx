import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4">
      <div className="flex items-center gap-2 cursor-grab">
        <div className="w-14 h-14 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Agilify Logo"
            className="w-14 h-14 object-contain block"
          />
        </div>

        <h2 className="text-xl font-bold text-black tracking-widest">
          Agilify
        </h2>
      </div>

      <Link
        to="/login"
        className="text-gray-700 font-medium hover:text-black transition cursor-pointer"
      >
        Log in
      </Link>
    </div>
  );
}
