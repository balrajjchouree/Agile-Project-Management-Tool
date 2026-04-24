const UserStory = require("../models/userStory.model");

exports.createUserStory = async (req, res) => {
  try {
    const story = await UserStory.create({
      ...req.body,
      projectId: req.body.projectId
    });

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUserStories = async (req, res) => {
  try {
    const stories = await UserStory.findAll({
      where: { projectId: req.params.projectId }
    });

    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};