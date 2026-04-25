const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const User = require("../models/user.model");

router.post("/register", register);
router.post("/login", login);

router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;