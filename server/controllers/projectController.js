import Project from "../models/Project.js";

/* ===========================
   GET ALL PROJECTS
=========================== */

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

/* ===========================
   CREATE PROJECT
=========================== */

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ===========================
   UPDATE PROJECT
=========================== */

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ===========================
   DELETE PROJECT
=========================== */

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};