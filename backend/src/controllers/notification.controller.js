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

exports.markAsRead = async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { id: req.params.id } }
    );

    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};