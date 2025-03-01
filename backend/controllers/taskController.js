import Task from "../models/Task.js";
import catchAsync from "../utils/catchAsync.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

export const getAllTasks = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let query = Task.find(queryObj).populate("assignedTo");

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const tasks = await query;
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

export const assignTask = catchAsync(async (req, res) => {
  const { taskId, userId } = req.body;

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.assignedTo = userId;
  await task.save();

  // 🔔 Create a notification for the assigned user
  const notification = new Notification({
    user: userId,
    message: `You have been assigned a new task: ${task.title}`,
  });

  await notification.save();

  res.status(200).json({ message: "Task assigned and notification sent" });
});

export const getTaskById = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  // ✅ Check if projectId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid projectId format" });
  }
  const tasks = await Task.find({ project: projectId }).populate("assignedTo");
  res.json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const createTask = catchAsync(async (req, res) => {
  const { title, description, project, assignedTo, deadline } = req.body;
  const dueDate = new Date(deadline);
  if (isNaN(dueDate)) {
    return res.status(400).json({ error: "Invalid date format for deadline" });
  }
  const task = new Task({
    title,
    description,
    project,
    assignedTo,
    dueDate,
  });
  await task.save();
  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

export const updateTask = catchAsync(async (req, res) => {
  const { title, description, assignedTo, deadline } = req.body;
  const dueDate = new Date(deadline);
  if (isNaN(dueDate)) {
    return res.status(400).json({ error: "Invalid date format for deadline" });
  }
  const task = await Task.findByIdAndUpdate(
    req.params.projectId,
    { title, description, assignedTo, dueDate },
    { new: true, runValidators: true }
  );
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({
    status: "success",
    data: {
      task,
    },
  });
});

export const deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.projectId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ message: "Task deleted successfully" });
});
