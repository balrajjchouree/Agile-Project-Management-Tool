const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Notification = sequelize.define("Notification", {
  message: DataTypes.STRING,
  type: DataTypes.STRING, // overdue, reminder

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  taskId: {
    type: DataTypes.UUID
  },

  userId: {
    type: DataTypes.UUID
  }
});

module.exports = Notification;