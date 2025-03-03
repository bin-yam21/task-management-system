import { useState, useEffect } from "react";
import api from "../api";
import Button from "./ui/Button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/v1/user/me");
        setUser(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.patch("/api/v1/user/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage("Password changed successfully");
    } catch (error) {
      setMessage("Error changing password");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-4xl">
          😊
        </div>
        <h1 className="text-2xl font-bold mt-4 dark:text-white">{user.name}</h1>
      </div>
      <div className="mb-8">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            className="mr-2"
          />
          <span className="dark:text-white">Dark Mode</span>
        </label>
      </div>
      <form onSubmit={handleChangePassword} className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Change Password
        </h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Current Password"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Confirm New Password"
          required
        />
        <Button type="submit" className="w-full">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default Profile;
