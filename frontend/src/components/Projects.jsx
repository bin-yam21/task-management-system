import { useState, useEffect } from "react";
import api from "../api";
import NewProjectForm from "./NewProjectForm";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/v1/projects");
        setProjects(response.data.data.projects); // Ensure this matches the API response structure
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      {userRole === "admin" || userRole === "manager" ? (
        <div>
          <h3 className="text-lg">Add New Project</h3>
          <NewProjectForm onProjectCreated={handleProjectCreated} />
        </div>
      ) : null}

      <div>
        <h3 className="text-lg mt-4">Your Projects</h3>
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="border p-2 mb-2">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
