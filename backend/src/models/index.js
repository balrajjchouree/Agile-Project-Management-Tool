const User = require("./user.model");
const Workspace = require("./workspace.model");

// User -> Workspace
Workspace.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Workspace, { foreignKey: "ownerId" });

module.exports = { User, Workspace };