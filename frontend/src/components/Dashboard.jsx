import { useState, useEffect } from "react";
import api from "../api";
import NotificationBar from "./NotificationBar";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <div className="p-4">
      <NotificationBar />
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {userRole === "admin" || userRole === "manager" ? (
        // UI for Admin/Manager
        <div>
          <h3 className="text-lg font-semibold">Admin/Manager Panel</h3>
          <p>Welcome to the admin/manager dashboard.</p>
        </div>
      ) : (
        // UI for Members
        <div>
          <h3 className="text-lg font-semibold">Your Dashboard</h3>
          <p>Welcome to your dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
