import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  "Organize and manage tasks",
  "Track project progress",
  "Assign tasks to team members",
  "Set deadlines and priorities",
  "Receive notifications",
  "Generate reports",
  "Collaborate with team",
  "Monitor task status",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, Math.max(features.length - 3, 0))
      );
    } else if (offset > 100 || velocity > 500) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to Task Management System
      </h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Our Task Management System helps you organize and manage your tasks and
        projects efficiently. Whether you are an admin, manager, or member, you
        can easily track your tasks and projects.
      </p>
      <div className="flex gap-4 mb-12">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </Link>
      </div>
      <motion.div
        className="w-full max-w-5xl overflow-hidden relative"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -((features.length - 3) * 350), right: 0 }}
          animate={{ x: -currentIndex * 360 }}
          transition={{ type: "spring", stiffness: 100 }}
          onDragEnd={handleDragEnd}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="min-w-[350px] h-[200px] bg-white p-10 rounded-lg shadow-lg text-center text-xl font-semibold flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Home;
