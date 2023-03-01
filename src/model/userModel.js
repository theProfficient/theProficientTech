const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    UserId: {
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
    balance:{
        type: Number,
        required :true,
        default:0
    },
    status:{
      type:Number,
      required:true,
      default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GammingUser", userSchema);
