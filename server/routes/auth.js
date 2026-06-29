const express = require("express");
const router = express.Router();
const { register, login, getMe, getAuthors } = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/authors", getAuthors);

module.exports = router;
