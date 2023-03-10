const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cricketSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      // ref: "User",
      // unique: true,
    },
    balanceId:{
      type:ObjectId,
      ref:"balance"
    },
    cricMatch: {
      type: Number,
      trim: true,
      default: 0,
    },
    cricRuns: {
      type: Number,
      trim: true,
      default: 0,
    },
    cricWins: {  
      type: Number,
      trim: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cricket", cricketSchema);
