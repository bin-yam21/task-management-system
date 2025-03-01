import React, { useState } from "react";
import axios from "axios";

const NewTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/tasks", { title });
      onTaskCreated(response.data.task); // Refresh task list
      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
        placeholder="New Task"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Task
      </button>
    </form>
  );
};

export default NewTaskForm;
