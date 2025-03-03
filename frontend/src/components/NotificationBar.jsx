import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import api from "../api";

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0); // State for task count
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/api/v1/notifications/${userId}`);
        setNotifications(response.data.data.notifications);
        setUnreadCount(
          response.data.data.notifications.filter((n) => !n.read).length
        );
        // Fetch task count
        const taskResponse = await api.get(`/api/v1/tasks/assigned/${userId}`);
        setTaskCount(taskResponse.data.data.tasks.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleTaskIconClick = () => {
    navigate("/tasks"); // Navigate to the task page
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="flex justify-between items-center flex-wrap">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="relative">
          <span className="material-icons">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="relative cursor-pointer" onClick={handleTaskIconClick}>
          <span className="material-icons">assignment</span>
          {taskCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {taskCount}
            </span>
          )}
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {notifications.map((notification) => (
          <li key={notification._id} className="mt-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBar;
