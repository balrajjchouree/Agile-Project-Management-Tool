const User = require("./user.model");
const Workspace = require("./workspace.model");
const Project = require("./project.model")

// User -> Workspace
Workspace.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Workspace, { foreignKey: "ownerId" });

//Workspace -> Project
Workspace.hasMany(Project, { foreignKey: "workspaceId" });
Project.belongsTo(Workspace, { foreignKey: "workspaceId" });

module.exports = { User, Workspace, Project };