import Project from "../models/Project.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllProjects = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((field) => delete queryObj[field]);

  let query = Project.find(queryObj).populate("team");

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const projects = await query;
  res.json({
    status: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
});

export const createProject = catchAsync(async (req, res) => {
  const { name, description, startDate, endDate, team } = req.body;
  const project = new Project({
    name,
    description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    createdBy: req.user._id,
    team,
  });
  await project.save();
  res.status(201).json({
    status: "success",
    data: {
      project,
    },
  });
});

export const getProjectById = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("team")
    .populate("tasks");
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({
    status: "success",
    data: {
      project,
    },
  });
});

export const updateProject = catchAsync(async (req, res) => {
  const { name, description, startDate, endDate, team } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      team,
    },
    { new: true, runValidators: true }
  );
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({
    status: "success",
    data: {
      project,
    },
  });
});

export const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({ message: "Project deleted successfully" });
});
