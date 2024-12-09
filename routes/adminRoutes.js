const express = require("express");
const {
    getAllUsersController,
    removeUserController,
} = require("../controllers/adminController");
const authMiddelware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-all-users",authMiddelware, getAllUsersController);
//LOGIN || POSTS
router.delete("/remove-user/:userId", authMiddelware,removeUserController);


module.exports = router;
