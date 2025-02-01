const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

// User Management Controllers
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

const updateUserStatusController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserStatusController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Update User Status API",
      error: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Remove password from updateData if it exists
    delete updateData.password;

    const user = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error: error.message,
    });
  }
};


// Donation Statistics Controllers
const getDonationStatisticsController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let dateQuery = {};

    if (startDate && endDate) {
      dateQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Get total donations by blood group
    const bloodGroupStats = await inventoryModel.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: "$bloodGroup",
          totalQuantity: { $sum: "$quantity" },
          totalDonations: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);

    // Get monthly donation trends
    const monthlyTrends = await inventoryModel.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalQuantity: { $sum: "$quantity" },
          totalDonations: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Get organization-wise donation statistics
    const organizationStats = await inventoryModel.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: "$organization",
          totalQuantity: { $sum: "$quantity" },
          totalDonations: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);

    return res.status(200).send({
      success: true,
      message: "Donation statistics fetched successfully",
      statistics: {
        bloodGroupStats,
        monthlyTrends,
        organizationStats
      }
    });
  } catch (error) {
    console.error("Error in getDonationStatisticsController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Donation Statistics API",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsersController,
  removeUserController,
  updateUserStatusController,
  updateUserController,
  getDonationStatisticsController
};