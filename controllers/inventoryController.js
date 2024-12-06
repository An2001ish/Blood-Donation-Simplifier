const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  console.log("create inv: "+req.body)
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }
    //save record
    
    const inventory = new inventoryModel(req.body);
    inventory.recId = user.email; 
    console.log("saved inventory: "+inventory)
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create Inventory API",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    console.log("Request query:", JSON.stringify(req.query, null, 2));
    console.log("Request email:", req.query.email);

    if (!req.query.email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }

    const inventory = await inventoryModel
      .find({
        recId: req.query.email
      })
      .sort({ createdAt: -1 });

    console.log("Found inventory:", inventory);

    if (inventory.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No inventory records found for this user",
        inventory: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "Inventory records fetched successfully",
      inventory,
    });
  } catch (error) {
    console.error("Error in getInventoryController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Inventory API",
      error: error.message,
    });
  }
};


  module.exports = { createInventoryController, getInventoryController };

