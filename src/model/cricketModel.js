const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cricketSchema = new mongoose.Schema(
  {
    UserId: {
      type:String
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
    types:{
      objective: {
        type: Boolean,
        trim: true,
        default: false,
      },
      chase: {
        type: Boolean,
        trim: true,
        default: false,
      },
      multiplayer: {  
        type: Boolean,
        trim: true,
        default: false,
      },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cricket", cricketSchema);
