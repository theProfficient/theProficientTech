const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    referralCode: {
      type: String,
    },
    credits: {
      type: Number,
      default: 100,
    },
    isBot: {
      type: Boolean,
      default: false,
    },
    realMoney: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    history: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
