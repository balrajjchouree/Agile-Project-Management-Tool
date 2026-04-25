const Project = require("../models/project.model");
const Task = require("../models/task.model");
const Workspace = require("../models/workspace.model");
const { Op } = require("sequelize");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const workspaces = await Workspace.findAll({
      where: { ownerId: userId },
    });

    const workspaceIds = workspaces.map((w) => w.id);

    const projects = await Project.findAll({
      where: { workspaceId: workspaceIds },
    });

    const projectIds = projects.map((p) => p.id);

    const totalProjects = projects.length;

    const completedProjects = await Project.count({
      where: {
        workspaceId: workspaceIds,
        status: "completed",
      },
    });

    const totalTasks = await Task.count({
      where: {
        userStoryId: {
          [Op.in]: projectIds,
        },
      },
    });

    const overdueTasks = await Task.count({
      where: {
        dueDate: { [Op.lt]: new Date() },
        status: { [Op.ne]: "done" },
      },
    });

    res.json({
      totalProjects,
      completedProjects,
      totalTasks,
      overdueTasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
