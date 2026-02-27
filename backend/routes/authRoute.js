const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userProfile,
} = require("../controllers/authController");

const auth = require("../middlewares/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", auth, userProfile);

module.exports = router;
