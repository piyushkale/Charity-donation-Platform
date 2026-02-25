const express = require("express");
const router = express.Router();
// route imports
const authRoute = require("./authRoute");
const charityRoute = require("./charityRoute");

router.use("/auth", authRoute);
router.use("/charities", charityRoute);
// router.use("/donations");
// router.use("/reports");
// router.use("/admin");

module.exports = router;
