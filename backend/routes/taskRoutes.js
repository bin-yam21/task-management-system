import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.route("/").get(getAllTasks).post(createTask);
taskRouter.route("/assign").post(assignTask);
taskRouter
  .route("/:projectId")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default taskRouter;
