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
    snakMatch: {
      type: Number,
      trim: true,
    },
    snakWins: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("snakeLadder", userSchema);
