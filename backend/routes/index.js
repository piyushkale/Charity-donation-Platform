const express = require("express");
const router = express.Router();
require("../models/associations");
// route imports
const authRoute = require("./authRoute");
const charityRoute = require("./charityRoute");
const adminRoute = require("./adminRoute");
const donationRoute = require("./donationRoute");

router.use("/auth", authRoute);
router.use("/charities", charityRoute);
router.use("/donations", donationRoute);
// router.use("/reports");
router.use("/admin", adminRoute);

module.exports = router;
