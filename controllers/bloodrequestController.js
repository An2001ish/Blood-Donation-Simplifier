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
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    
    const bloodrequest = new bloodrequestModel(req.body);
    bloodrequest.recId = user.email;
    bloodrequest.recUserId = user._id;
    console.log("saved inventory: "+bloodrequest)
    await bloodrequest.save();
    return res.status(201).send({
      success: true,
      message: "New Blood request Added",
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
    let query = {};

    if (req.query.recId) {
      query.recId = req.query.recId;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if(req.query.acceptId) {
      query.acceptId = req.query.acceptId;
    }

    const bloodrequests = await bloodrequestModel.find(query);

    // Get user IDs for both receiver and acceptor
    const populatedRequests = await Promise.all(bloodrequests.map(async (request) => {
      const receiver = await userModel.findOne({ email: request.recId });
      const acceptor = request.acceptId ? await userModel.findOne({ email: request.acceptId }) : null;
      
      return {
        ...request.toObject(),
        recUserId: receiver?._id,
        acceptUserId: acceptor?._id
      };
    }));

    return res.status(200).send({
      success: true,
      message: "Get blood request successfully",
      bloodrequests: populatedRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Blood Request API",
      error,
    });
  }
};

const updateRequestStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, acceptId } = req.body;

    // Find the acceptor user
    const acceptor = await userModel.findOne({ email: acceptId });
    if (!acceptor && status === "Accepted") {
      return res.status(404).send({
        success: false,
        message: "Acceptor not found",
      });
    }

    // Find and update the request
    const request = await bloodrequestModel.findById(id);
    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Blood request not found",
      });
    }

    // Update only the status and acceptor fields, preserving other fields
    const updatedRequest = await bloodrequestModel.findByIdAndUpdate(
      id,
      {
        status,
        ...(status === "Accepted" && {
          acceptId: acceptor.email,
          acceptUserId: acceptor._id
        })
      },
      { new: true, runValidators: true }
    );

    return res.status(200).send({
      success: true,
      message: "Blood Request Updated",
      data: updatedRequest
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Update Blood Request API",
      error,
    });
  }
};

module.exports = { createbloodrequestController, getbloodrequestController, updateRequestStatusController };
