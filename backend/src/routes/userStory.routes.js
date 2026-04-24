const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createUserStory,
  getUserStories
} = require("../controllers/userStory.controller");

router.post("/", auth, createUserStory);
router.get("/:projectId", auth, getUserStories);

module.exports = router;