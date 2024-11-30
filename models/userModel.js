const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "user"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is requied!"],
    },
    website: {
      type: String,
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