const express = require("express")
const roleMiddleware = require("../middlewares/roleMiddleware")
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController")

const router = express.Router()

router.post("/create-inventory", roleMiddleware(["admin", "donor","organization","hospital"]), createInventoryController)
router.get("/get-inventory", getInventoryController)

module.exports = router



