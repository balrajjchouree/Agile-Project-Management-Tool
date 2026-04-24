const Project = require("../models/project.model");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      workspaceId: req.body.workspaceId
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { workspaceId: req.params.workspaceId }
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};