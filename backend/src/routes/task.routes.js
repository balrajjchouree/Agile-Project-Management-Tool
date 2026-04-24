const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const { createTask, getTasks } = require("../controllers/task.controller");

router.post("/", auth, createTask);
router.get("/:userStoryId", auth, getTasks);

module.exports = router;