const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyDonations,
  topDonors,
  downloadHistory
} = require("../controllers/donationController");

const auth = require("../middlewares/authMiddleware");

router.post("/createOrder", auth, createOrder);

router.post("/verifyPayment", auth, verifyPayment);

router.get("/my", auth, getMyDonations);

router.get("/download",auth,downloadHistory)

router.get("/topDonations", topDonors);

module.exports = router;
