const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const projectRoutes = require("./routes/project.route");
const userStoryRoutes = require("./routes/userStory.routes");
const taskRoutes = require("./routes/task.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/user-stories", userStoryRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;