const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role must be selected!"],
      enum: ["admin", "organization", "donor", "hospital"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
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
    bloodGroup: {
      type: String,
      // enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone numbe is required!"],
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
