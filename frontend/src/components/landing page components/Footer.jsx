import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-10 flex flex-col items-center gap-4 text-gray-500">
      <a
        href="https://github.com/balrajjchouree"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-black transition"
      >
        <FaGithub />
      </a>

      <p className="text-sm">
        © {new Date().getFullYear()} Agilify. Built by Balraj.
      </p>
    </footer>
  );
}
