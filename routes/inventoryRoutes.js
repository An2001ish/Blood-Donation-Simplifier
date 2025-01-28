// const express = require("express")
// const authMiddleware = require("../middlewares/authMiddleware")
// const { createInventoryController, getInventoryController } = require("../controllers/inventoryController")

// const router = express.Router()

// router.post("/create-inventory", authMiddleware, createInventoryController)
// router.get("/get-inventory", authMiddleware, getInventoryController)

// module.exports = router

const express = require("express")
const roleMiddleware = require("../middlewares/roleMiddleware")
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController")

const router = express.Router()

router.post("/create-inventory", roleMiddleware(["admin", "organization","hospital"]), createInventoryController)
router.get("/get-inventory", getInventoryController)

module.exports = router



