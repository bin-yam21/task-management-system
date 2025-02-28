import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate(
      "assignedTo"
    );
    res.json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
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
    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, assignedTo, deadline } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.projectId,
      { title, description, assignedTo, deadline },
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.projectId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
