const express = require("express");
const { getChatMessages, markMessagesAsRead } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:requestId", authMiddleware, getChatMessages);
router.put("/read/:requestId/:userId", authMiddleware, markMessagesAsRead);

module.exports = router;
