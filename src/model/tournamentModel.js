const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema(
  {
    UserId:{
      type:String,
      trim : true
    },
  entryFee: {
      type: Number,
      trim: true,
    },

    prizeAmount: {
      type: Number,
      trim: true,
    },

    players: {
     type: Number,
      required: true,
      default:0,
   },
    status: {
      type: String,
      enum: ['upcoming', 'in_progress' , 'full'],
      default: 'in_progress',
    },
    maxTime : {
      type:Number
    },
    Users : [],
    display:{
      type:Boolean,
      default : true
    },
    expireAt:{
      type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("tournament", tournamentSchema);
