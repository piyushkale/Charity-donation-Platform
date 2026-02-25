const express = require("express");
const router = express.Router();
// route imports
const authRoute = require("./authRoute");
const charityRoute = require("./charityRoute");
const adminRoute = require('./adminRoute')

router.use("/auth", authRoute);
router.use("/charities", charityRoute);
// router.use("/donations");
// router.use("/reports");
router.use("/admin",adminRoute);

module.exports = router;
