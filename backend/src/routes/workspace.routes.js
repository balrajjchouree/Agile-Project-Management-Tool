const router = require("express").Router();
const { createWorkspace, getWorkspaces } = require("../controllers/workspace.controller");
const auth = require("../middleware/auth.middleware");

router.post("/create-workspace", auth, createWorkspace);
router.get("/all-workspace", auth, getWorkspaces);

module.exports = router;