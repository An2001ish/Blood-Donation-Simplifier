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

 //GET CURRENT USER
//GET CURRENT USER
// const currentUserController = async (req, res) => {
//     try {

//       console.log("current user:"+req.body)
//       const user = await userModel.findOne({ _id: req.body.userId });
//       console.log("current user:"+user)
//       return res.status(200).send({
//         success: true,
//         message: "User Fetched Successfully",
//         user,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({
//         success: false,
//         message: "unable to get current user",
//         error,
//       });
//     }
//   };

const currentUserController = async (req, res) => {
  try {
    console.log("Fetching current user for userId:", req.userId);
    const {userId} = req.userId 
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    console.log("Found user:", user);
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Add any other fields you want to send to the client
      },
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