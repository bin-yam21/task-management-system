import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  const { name, description, team } = req.body;
  try {
    const project = new Project({
      name,
      description,
      createdBy: req.user.id,
      team,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().populate("team");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
