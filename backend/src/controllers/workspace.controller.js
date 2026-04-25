const Workspace = require("../models/workspace.model");

exports.createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    let baseSlug = name.toLowerCase().replace(/\s+/g, "-");
    let slug = baseSlug;

    let count = 1;

    while (true) {
      const existing = await Workspace.findOne({ where: { slug } });

      if (!existing) break;

      slug = `${baseSlug}-${count}`;
      count++;
    }

    const workspace = await Workspace.create({
      name,
      slug,
      ownerId: req.user.id,
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
      where: { ownerId: req.user.id },
    });

    res.json(workspaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
