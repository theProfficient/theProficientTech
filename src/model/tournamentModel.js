const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema(
  {
  entryFee: {
      type: Number,
      unique: true,
      trim: true,
    },

    prizeAmount: {
      type: Number,
      unique: true,
      trim: true,
    },

    players: {
     type: Number,
      required: true,
      default:0,
   },
    status: {
      type: String,
      enum: ['upcoming', 'in progress' , 'full'],
      default: 'upcoming',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tournament", tournamentSchema);
