const express = require("express");
const {
  getAllUsersController,
  removeUserController,
  updateUserStatusController,
  updateUserController,
  getDonationStatisticsController
} = require("../controllers/adminController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// User Management Routes
router.get("/get-all-users", roleMiddleware(["admin"]), getAllUsersController);
router.delete("/remove-user/:userId", roleMiddleware(["admin"]), removeUserController);
router.put("/update-user-status/:userId", roleMiddleware(["admin"]), updateUserStatusController);
router.put("/update-user/:userId", roleMiddleware(["admin"]), updateUserController);

// Donation Statistics Routes
router.get("/donation-statistics", roleMiddleware(["admin"]), getDonationStatisticsController);

module.exports = router;
