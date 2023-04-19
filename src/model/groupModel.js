const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const groupSchema = new mongoose.Schema(
  {
    createdTime: {
      type: Date,
      default: Date.now,
      expires: "30m",
    },
    tableId: {
      type: String,
    },
    updatedPlayers: [
      {
        _id: false,
        UserId: String,
        userName: String,
        run: {
          type: Number,
          default: 0,
        },

        wicket: {
          type: Number,
          default: 0,
        },
        hit: {
          type: Boolean,
          default: false,
        },
        isRunUpdated: {
          type: Boolean,
          default: false,
        },
        isBot: {
          type: Boolean,
          default: false,
        },
      },
    ],
    ball: {
      type: Number,
      default: 6,
    },
    start: {
      type: Boolean,
      default: false,
    },
    currentBallTime: {
      type: Date,
      default: Date.now(),
    },
    nextBallTime: {
      type: Date,
      default: new Date(Date.now() + 1 * 4 * 1000).toISOString(),
    },
    ballSpeed: {
      type: Number,
      default: 13,
    },
    isWicketUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Group", groupSchema);
