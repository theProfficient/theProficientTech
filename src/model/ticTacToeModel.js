const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    UserId: {
      type: ObjectId,
      ref: "GammingUser",
      required: true,
      unique: true,
    },
    ticMatch: {
      type: Number,
      trim: true,
    },
    ticWins: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticTacToe", userSchema);
