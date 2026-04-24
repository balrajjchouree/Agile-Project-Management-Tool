const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userStoryId: req.body.userStoryId
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userStoryId: req.params.userStoryId }
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};