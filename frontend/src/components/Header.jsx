import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
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
    </header>
  );
};

export default Header;
