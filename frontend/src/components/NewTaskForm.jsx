import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import api from "../api";

const NewTaskForm = ({ onTaskCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/v1/user");
        setUsers(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/v1/projects");
        setProjects(response.data.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchUsers();
    fetchProjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/v1/tasks", {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        assignedTo: data.assignedTo,
        project: data.project,
      });
      onTaskCreated(response.data.data.task); // Refresh task list
      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Task
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-4"
        >
          <input
            {...register("title", { required: true })}
            className="border p-2"
            placeholder="Task Title"
          />
          <textarea
            {...register("description", { required: true })}
            className="border p-2"
            placeholder="Task Description"
          />
          <input
            type="date"
            {...register("dueDate", { required: true })}
            className="border p-2"
          />
          <select
            {...register("assignedTo", { required: true })}
            className="border p-2"
          >
            <option value="">Assign to</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            {...register("project", { required: true })}
            className="border p-2"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default NewTaskForm;
