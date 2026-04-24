const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Project = sequelize.define("Project", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,

  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },

  priority: {
    type: DataTypes.STRING,
    defaultValue: "medium",
  },

  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,

  projectLead: DataTypes.STRING,

  teamMembers: {
    type: DataTypes.JSON, // store array of {name,email}
  },

  workspaceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Project;
