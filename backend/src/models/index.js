const User = require("./user.model");
const Workspace = require("./workspace.model");
const Project = require("./project.model");
const UserStory = require("./userStory.model");

// User -> Workspace
Workspace.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Workspace, { foreignKey: "ownerId" });

//Workspace -> Project
Workspace.hasMany(Project, { foreignKey: "workspaceId" });
Project.belongsTo(Workspace, { foreignKey: "workspaceId" });

// Project -> User Story
Project.hasMany(UserStory, { foreignKey: "projectId" });
UserStory.belongsTo(Project, { foreignKey: "projectId" });

// UserStory -> Task
UserStory.hasMany(Task, { foreignKey: "userStoryId" });
Task.belongsTo(UserStory, { foreignKey: "userStoryId" });

module.exports = { User, Workspace, Project, UserStory };