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
    hocMatch: {
      type: Number,
      trim: true,
    },
    hocRuns: {
      type: Number,
      trim: true,
    },
    hocWins: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hocky", userSchema);
