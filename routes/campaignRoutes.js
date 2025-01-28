const express = require("express")
const { createCampaign, getCampaigns } = require("../controllers/campaignController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", authMiddleware, createCampaign)
router.get("/", getCampaigns)

module.exports = router

