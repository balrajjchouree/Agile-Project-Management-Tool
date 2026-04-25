const Task = require("../models/task.model");
const Notification = require("../models/notification.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userStoryId: req.body.userStoryId,
      createdBy: req.user.id,
    });

    if (req.body.assignedTo) {
      await Notification.create({
        message: `You have been assigned task: ${task.title}`,
        type: "assignment",
        taskId: task.id,
        userId: req.body.assignedTo,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userStoryId: req.params.userStoryId },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Not found" });

    if (task.createdBy !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Not found" });

    if (task.createdBy !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
