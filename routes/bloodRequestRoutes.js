
// const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
// const { 
//   createbloodrequestController, 
//   getbloodrequestController,
//   updateRequestStatusController
// } = require("../controllers/bloodrequestController");

// const router = express.Router();

// router.post("/create-bloodrequest", authMiddleware, createbloodrequestController);
// router.get("/get-bloodrequest", authMiddleware, getbloodrequestController);
// router.put("/update-status/:id", authMiddleware, updateRequestStatusController);

// module.exports = router;

const express = require("express")
const roleMiddleware = require("../middlewares/roleMiddleware")
const {
  createbloodrequestController,
  getbloodrequestController,
  updateRequestStatusController,
} = require("../controllers/bloodrequestController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create-bloodrequest", roleMiddleware(["hospital", "organization"]), createbloodrequestController)
router.get("/get-bloodrequest", getbloodrequestController)
router.put("/update-status/:id", roleMiddleware(["admin", "organization","donor"]), updateRequestStatusController)

module.exports = router




