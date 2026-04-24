const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getDashboard } = require("../controllers/dashboard.controller");

router.get("/", auth, getDashboard);

module.exports = router;