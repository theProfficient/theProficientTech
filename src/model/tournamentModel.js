const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const tournamentSchema = new mongoose.Schema(
  {
    UserId:{
      type:String,
      unique : true,
      trim : true
    },
  entryFee: {
      type: Number,
      // unique: true,
      trim: true,
    },

    prizeAmount: {
      type: Number,
      // unique: true,
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
      default: 'upcoming',
    },
    maxTime : {
      type:Number
    },
    Users : [],
    display:{
      type:Boolean,
      default : true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tournament", tournamentSchema);
