const express = require("express");
const router = express.Router();
const adminAuthentication = require("../middlewares/adminAuth.js");
const {
  getCharitiesByStatus,
  charityOrganizations,
  updateCharityStatus,
} = require("../controllers/adminController.js");

// admin authentication middleware
router.use(adminAuthentication);

router.get("/status/:status", getCharitiesByStatus);
router.get("/charityOrganizations", charityOrganizations);
router.patch("/status/:id", updateCharityStatus);

module.exports = router;
