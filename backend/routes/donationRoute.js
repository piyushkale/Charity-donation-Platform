const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyDonations
} = require("../controllers/donationController");

const auth = require("../middlewares/authMiddleware");

router.use(auth);
router.post("/createOrder", createOrder);

router.post("/verifyPayment", verifyPayment);

router.get("/my",getMyDonations)

module.exports = router;
