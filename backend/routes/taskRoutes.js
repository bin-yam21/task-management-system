import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js"; // Corrected the import path

const taskRouter = express.Router();
taskRouter.route("/").get(getAllTasks).post(createTask);
taskRouter
  .route("/:projectId")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default taskRouter;
