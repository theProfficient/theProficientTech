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
      unique: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 100,
    },
    realMoney:{
      type: Number,
      required: true,
      default:0,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    history: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
