const Notification = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
  try {
    const data = await Notification.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};