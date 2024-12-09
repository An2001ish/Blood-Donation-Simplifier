const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({}, '-password'); // Exclude password field
      return res.status(200).send({
        success: true,
        message: "All users fetched successfully",
        users,
      });
    } catch (error) {
      console.error("Error in getAllUsersController:", error);
      return res.status(500).send({
        success: false,
        message: "Error in Get All Users API",
        error: error.message,
      });
    }
  };

  const removeUserController = async (req, res) => {
    try {
      const { userId } = req.params;
      const removedUser = await userModel.findByIdAndDelete(userId);
      
      if (!removedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User removed successfully",
        user: removedUser,
      });
    } catch (error) {
      console.error("Error in removeUserController:", error);
      return res.status(500).send({
        success: false,
        message: "Error in Remove User API",
        error: error.message,
      });
    }
  };
  
  module.exports = { getAllUsersController, removeUserController };
  
  