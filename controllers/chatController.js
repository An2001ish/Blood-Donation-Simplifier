const ChatMessage = require("../models/chatModel");

// Get chat messages for a specific blood request
const getChatMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    const messages = await ChatMessage.find({ requestId })
      .populate("sender", "name role")
      .populate("receiver", "name role")
      .sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting chat messages",
      error,
    });
  }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
  try {
    const { requestId, userId } = req.params;
    await ChatMessage.updateMany(
      {
        requestId,
        receiver: userId,
        read: false,
      },
      { read: true }
    );
    return res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in marking messages as read",
      error,
    });
  }
};

module.exports = { getChatMessages, markMessagesAsRead };
