const mongoose = require("mongoose");
const bloodrequestSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "blood quanity is require"],
    },
    status: {
      type: String,
      default: "Pending"
    },
    recId: {
      type: String,
      required: true
    },
    recUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    acceptId: {
      type: String
    },
    acceptUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("bloodrequest", bloodrequestSchema);
