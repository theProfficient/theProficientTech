const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

cricMatch: {
    type : Number,
    trim:true,
},

cricRuns : {
    type : Number,
    trim:true
},

cricWins : {
    type : Number,
    trim:true
},

}, { timestamps: true });

module.exports = mongoose.model("cricket", userSchema)