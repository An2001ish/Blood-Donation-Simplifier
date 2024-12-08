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
    status:{
      type:String
    },
    recId: {
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bloodrequest", bloodrequestSchema);
