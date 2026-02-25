const express = require("express");
const router = express.Router();
const {
  createCharity,
  getAllCharities,
  ownedCharities,
  deleteCharity
} = require("../controllers/charityController");
const auth = require("../middlewares/authMiddleware");

// get request to get all charities for user with role "USER"
router.get("/", getAllCharities);

// get all charities that an organization owns
router.get("/owner", auth, ownedCharities);

// post request to create a new charity by charity organization
router.post("/", auth, createCharity);

// delete charity
router.delete("/:id", auth, deleteCharity);

// router.patch("/:id", auth, updateCharity);

module.exports = router;
