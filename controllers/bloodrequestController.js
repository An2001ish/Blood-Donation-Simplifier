const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const bloodrequestModel = require("../models/bloodrequestModel");
// CREATE INVENTORY
const createbloodrequestController = async (req, res) => {
  console.log("create request: "+JSON.stringify(req.body))
  
  try {
      const { recId } = req.body;
    const email = recId;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
    }
    
    const bloodrequest = new bloodrequestModel(req.body);
    bloodrequest.recId = user.email; 
    console.log("saved inventory: "+bloodrequest)
    await bloodrequest.save();
    return res.status(201).send({
      success: true,
      message: "New Blod request Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create bloodreq API",
      error,
    });
  }
};

const getbloodrequestController = async (req, res) => {
  try {
    console.log("Get blood request: " + JSON.stringify(req.query));

    if (!req.query.recId) {
      const bloodrequests = await bloodrequestModel.find({})
      return res.status(200).send({
        success: true,
        message: "record fetched for donor",
        bloodrequests
      });
    }

    const bloodrequests = await bloodrequestModel
      .find({
        recId: req.query.recId
      })
      .sort({ createdAt: -1 });

    console.log("Found requests:", bloodrequests);

    return res.status(200).send({
      success: true,
      message: "Blood request records fetched successfully",
      bloodrequests,
    });
  } catch (error) {
    console.error("Error in getbloodrequestController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Blood Request API",
      error: error.message,
    });
  }
};

const updateRequestStatusController = async (req, res) => {
  try {
    console.log("in update"+req.params)
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await bloodrequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).send({
        success: false,
        message: "Blood request not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blood request status updated successfully",
      bloodrequest: updatedRequest,
    });
  } catch (error) {
    console.error("Error in updateRequestStatusController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Blood Request Status API",
      error: error.message,
    });
  }
};


  module.exports = { createbloodrequestController, getbloodrequestController, updateRequestStatusController };
//   , getInventoryController

