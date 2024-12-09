
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { 
  createbloodrequestController, 
  getbloodrequestController,
  updateRequestStatusController
} = require("../controllers/bloodrequestController");

const router = express.Router();

router.post("/create-bloodrequest", authMiddleware, createbloodrequestController);
router.get("/get-bloodrequest", authMiddleware, getbloodrequestController);
router.put("/update-status/:id", authMiddleware, updateRequestStatusController);

module.exports = router;