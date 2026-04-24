const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserStory = sequelize.define("UserStory", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,

  status: {
    type: DataTypes.STRING,
    defaultValue: "todo"
  },

  priority: {
    type: DataTypes.STRING,
    defaultValue: "medium"
  },

  projectId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = UserStory;