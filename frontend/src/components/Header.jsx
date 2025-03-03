import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa"; // Import notification icon
import Button from "./ui/Button";
import api from "../api";

const Header = () => {
  const [taskCount, setTaskCount] = useState(0); // State for task count
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
        const taskResponse = await api.get(`/api/v1/tasks/assigned/${userId}`);
        setTaskCount(taskResponse.data.data.tasks.length);
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };

    if (isAuthenticated && userRole === "member") {
      fetchTaskCount();
    }
  }, [isAuthenticated, userRole]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("userId"); // Clear user ID
    navigate("/login");
  };

  const handleTaskIconClick = () => {
    navigate("/tasks"); // Navigate to the task page
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link to="/" className="flex items-center mb-2 md:mb-0">
          <h1 className="text-2xl font-bold">Task Management</h1>
        </Link>
        <nav className="flex gap-4 flex-wrap">
          <Link to="/tasks" className="hover:underline">
            Tasks
          </Link>
          <Link to="/projects" className="hover:underline">
            Projects
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          {isAuthenticated && userRole === "member" && (
            <div
              className="relative cursor-pointer"
              onClick={handleTaskIconClick}
            >
              <FaBell className="text-xl" />
              {taskCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                  {taskCount}
                </span>
              )}
            </div>
          )}
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-green-500 hover:bg-green-700"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
