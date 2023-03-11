const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema(
  {
  entryFee: {
      type: String,
      unique: true,
      trim: true,
    },

    prizeAmount: {
      type: String,
      unique: true,
      trim: true,
    },

    players: {
     type: Number,
      required: true,
      default: 100,
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
