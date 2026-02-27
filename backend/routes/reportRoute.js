const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createImpactReport,
  getImpactReport,
} = require("../controllers/reportController");

router.post("/:charityId", auth, createImpactReport);

router.get("/:charityId", getImpactReport);

module.exports = router;
