import { useState, useEffect } from "react";
import api from "../api";
import NewTaskForm from "./NewTaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const fetchTasks = async () => {
      try {
        const response = await api.get("/api/v1/tasks");
        const allTasks = response.data.data.tasks;
        const userTasks = allTasks.filter(
          (task) => task.assignedTo._id === userId
        );
        setTasks(userTasks); // Ensure this matches the API response structure
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      const response = await api.patch(`/api/v1/tasks/${taskId}/complete`);
      const updatedTask = response.data.data.task;
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setSelectedTask(updatedTask);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const notCompletedTasks = tasks.filter((task) => task.status !== "completed");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {userRole === "admin" || userRole === "manager" ? (
        <div>
          <h3 className="text-lg">Add New Task</h3>
          <NewTaskForm onTaskCreated={handleTaskCreated} />
        </div>
      ) : null}

      <div>
        <h3 className="text-lg mt-4">Not Completed Tasks</h3>
        <ul className="space-y-2">
          {notCompletedTasks.map((task) => (
            <li key={task._id} className="border p-2 mb-2">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              {task.status !== "completed" && (
                <button
                  onClick={() => handleMarkAsCompleted(task._id)}
                  className="bg-green-500 text-white px-4 py-2 mt-2"
                >
                  Mark as Completed
                </button>
              )}
            </li>
          ))}
        </ul>
        <h3 className="text-lg mt-4">Completed Tasks</h3>
        <ul className="space-y-2">
          {completedTasks.map((task) => (
            <li key={task._id} className="border p-2 mb-2">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
