import {
  FaProjectDiagram,
  FaFlag,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Structured Project Management",
      description:
        "Organize your work with a clear structure of projects, user stories, and tasks for better clarity and tracking.",
      icon: <FaProjectDiagram />,
    },
    {
      title: "Priority & Status Tracking",
      description:
        "Easily assign priorities and update task statuses to keep your workflow organized and efficient.",
      icon: <FaFlag />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team by sharing tasks and tracking progress together.",
      icon: <FaUsers />,
    },
    {
      title: "Clean Dashboard",
      description:
        "Get a simple and intuitive overview of all your projects and tasks in one place.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-orange-500 font-semibold mb-2">
          Project Management Made Simple
        </p>
        <h2 className="text-4xl font-bold text-gray-800">
          Key Features of Agilify
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex gap-5 items-start p-6 rounded-xl bg-white/60 backdrop-blur-md border border-gray-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-lg text-xl">
              {feature.icon}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}