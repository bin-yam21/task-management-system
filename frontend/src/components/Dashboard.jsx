import { useState, useEffect } from "react";
import api from "../api";
import NewTaskForm from "./NewTaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/api/v1/tasks");
        setTasks(response.data.data.tasks); // Ensure this matches the API response structure
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div>
        <h3 className="text-lg">Your Tasks</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="border p-2 mb-2">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <NewTaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
    </div>
  );
};

export default Dashboard;
