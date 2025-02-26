import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, project, assignedTo, deadline } = req.body;
  try {
    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      deadline,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate(
      "assignedTo"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
