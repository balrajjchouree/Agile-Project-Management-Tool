const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getNotifications, markAsRead } = require("../controllers/notification.controller");

router.get("/", auth, getNotifications);

router.put("/:id/read", auth, markAsRead);

module.exports = router;