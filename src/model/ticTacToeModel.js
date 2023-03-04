const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    UserId: {
      type: ObjectId,
      ref: "User",
      unique: true,
    },
    ticMatch: {
      type: Number,
      default: 0,
      trim: true,
    },
    ticWins: {
      type: Number,
      default: 0,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticTacToe", userSchema);
