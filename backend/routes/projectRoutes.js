import express from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
const projectRouter = express.Router();
projectRouter.route("/").get(getAllProjects).post(createProject);
projectRouter
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

//check the auth middleware
export default projectRouter;
