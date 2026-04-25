const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: { type: DataTypes.STRING, defaultValue: "todo" },
  priority: { type: DataTypes.STRING, defaultValue: "medium" },
  assignedTo: {
    type: DataTypes.UUID,
  },
  dueDate: DataTypes.DATE,

  userStoryId: { type: DataTypes.UUID, allowNull: false },

  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Task;
