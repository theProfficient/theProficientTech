const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const groupSchema = new mongoose.Schema(  
   {
    createdTime: {
    type: Date,
    default: Date.now,
    expires: "30m",
  },
  tableId:{
    type:String
  },
  updatedPlayers:[],
  ball:{
    type:Number,
    default:0
  },
  start:{
    type:Boolean,
    default:false
  },
  currentBallTime :{
    type:Date
  },
  nextBallTime :{
    type:Date
  },

},{strict:false});

module.exports = mongoose.model("Group", groupSchema);