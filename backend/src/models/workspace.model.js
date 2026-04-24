const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Workspace = sequelize.define("Workspace", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  logo: {
    type: DataTypes.STRING
  },
  ownerId: {
    type: DataTypes.UUID
  }
});

module.exports = Workspace;