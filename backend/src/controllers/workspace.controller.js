const Workspace = require("../models/workspace.model");

exports.createWorkspace = async (req, res) => {
  try {
    const { name, slug, logo } = req.body;

    const workspace = await Workspace.create({
      name,
      slug,
      logo,
      ownerId: req.user?.id
    });

    res.json(workspace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.findAll({
      where: { ownerId: req.user.id } 
    });

    res.json(workspaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};