
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
router.put("/update-status/:id", roleMiddleware(["admin", "organization","hospital","donor"]), updateRequestStatusController)

module.exports = router




