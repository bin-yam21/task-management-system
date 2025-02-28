import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  const { name, description, team } = req.body;
  try {
    const project = new Project({
      name,
      description,
      createdBy: req.user.id,
      team,
    });
    await project.save();
    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("team");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { name, description, team } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, team },
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
