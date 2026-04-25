import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create and manage tasks in Agilify?",
      answer:
        "You can create tasks inside a project and update their status and priority as work progresses.",
    },
    {
      question: "Can I manage multiple projects?",
      answer:
        "Yes, you can create and manage multiple projects, each containing its own tasks and workflows.",
    },
    {
      question: "Does it support team collaboration?",
      answer:
        "Yes, team members can work together by sharing tasks and tracking progress within projects.",
    },
    {
      question: "How is work structured in the application?",
      answer:
        "Work is organized in a hierarchy of projects, tasks, and related activities for better clarity.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left py-4 cursor-pointer"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>

              <span className="text-gray-600">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
