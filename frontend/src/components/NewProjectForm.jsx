import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import api from "../api";

const NewProjectForm = ({ onProjectCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/v1/projects", data);
      onProjectCreated(response.data.data.project); // Refresh project list
      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Project
      </button>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
          <input
            {...register("name", { required: true })}
            className="border p-2"
            placeholder="Project Name"
          />
          <textarea
            {...register("description", { required: true })}
            className="border p-2"
            placeholder="Project Description"
          />
          <input
            type="date"
            {...register("startDate", { required: true })}
            className="border p-2"
          />
          <input
            type="date"
            {...register("endDate", { required: true })}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default NewProjectForm;
