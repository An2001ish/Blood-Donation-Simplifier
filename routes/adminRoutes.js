// const express = require("express");
// const {
//     getAllUsersController,
//     removeUserController,
// } = require("../controllers/adminController");
// const authMiddelware = require("../middlewares/authMiddleware");

// const router = express.Router();

// router.get("/get-all-users",authMiddelware, getAllUsersController);
// //LOGIN || POSTS
// router.delete("/remove-user/:userId", authMiddelware,removeUserController);


// module.exports = router;

const express = require("express")
const { getAllUsersController, removeUserController } = require("../controllers/adminController")
const roleMiddleware = require("../middlewares/roleMiddleware")

const router = express.Router()

router.get("/get-all-users", roleMiddleware(["admin"]), getAllUsersController)
router.delete("/remove-user/:userId", roleMiddleware(["admin"]), removeUserController)

module.exports = router
