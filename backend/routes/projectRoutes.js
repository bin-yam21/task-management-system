import express from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const projectRouter = express.Router();

projectRouter.use(authMiddleware);

projectRouter.route("/").get(getAllProjects).post(createProject);
projectRouter
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default projectRouter;
