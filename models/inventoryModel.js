const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema(
  {
   
    // },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    organization: {
      type: String,
      required: [true, "Organisation/Hospital name is required"],
    },
    
    recId: {
      
  
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
