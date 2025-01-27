const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  console.log("Request Body:", req.body);
    try {
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      //validation
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "A user with same email already exists!",
        });
      }
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      //rest data
      const user = new userModel(req.body);
      await user.save();
      return res.status(201).send({
        success: true,
        message: "Registration Successfull!",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };

  const loginController = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
      const user = await userModel.findOne({ email: req.body.email });
      console.log(user)
      if (!user) {
        console.log("bad info")
        return res.status(404).send({
          success: false,
          message: "Invalid Client Info",
        });
      }

      //check role
    if (user.role !== req.body.role) {
      console.log("bad info")
      return res.status(500).send({
        success: false,
        message: "role dosent match",
      });
    }

      //compare password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!comparePassword) {
        return res.status(500).send({
          success: false,
          message: `Invalid Client pw Info ${comparePassword} ${user.password} ${req.body.password} `,

        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log("good info")
      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
  };


const currentUserController = async (req, res) => {
  try {
    console.log("Fetching current user for :", req.user.name);
    const current_user = req.user;
    // const {userId} = req.userId 
    // const user = await userModel.findById(userId);
    // if (!user) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "User not found",
    //   });
    // }
    // console.log("Found user:", req.user);
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      current_user,
      // user: {
      //   _id: current_user._id,
      //   name: current_user.name,
      //   email: current_user.email,
      //   role: current_user.role,
      //   // Add any other fields you want to send to the client
      // },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};

  module.exports = { registerController, loginController, currentUserController };