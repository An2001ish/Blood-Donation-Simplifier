const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role must be selected!"],
      enum: ["admin", "organisation", "donor", "hospital"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"]
      // required: function () {
      //   if (this.role === "user" || this.role === "admin") {
      //     return true;
      //   }
      //   return false;
      // },
    },
    // organisationName: {
    //   type: String,
    //   required: [true, "Email is required!"]
    //   // required: function () {
    //   //   if (this.role === "organisation") {
    //   //     return true;
    //   //   }
    //   //   return false;
    //   // },
    // },
    // hospitalName: {
    //   type: String,
    //   required: function () {
    //     if (this.role === "hospital") {
    //       return true;
    //     }
    //     return false;
    //   },
    // },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is requied!"],
    },
    
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone numbe is required!"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
