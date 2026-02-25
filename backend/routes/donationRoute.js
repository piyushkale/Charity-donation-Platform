const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/donationController");

const auth = require("../middlewares/authMiddleware");

router.use(auth);
router.post("/createOrder", createOrder);

router.post("/verifyPayment", verifyPayment);

module.exports = router;
