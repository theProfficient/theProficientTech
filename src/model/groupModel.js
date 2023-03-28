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

},{strict:false});

module.exports = mongoose.model("Group", groupSchema);