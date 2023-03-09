const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const balanceSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      // ref: "User",
    },
     cricketId:{
      type:ObjectId,
      ref:"cricket",
      require:true
    },
    objective: {
      type: Boolean,
      trim: true,
      default: 0,
    },
    chase: {
      type: Boolean,
      trim: true,
      default: 0,
    },
    multiplayer: {  
      type: Boolean,
      trim: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("balance", balanceSchema);
