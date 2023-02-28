const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    hocMatch: {
        type : Number,
        trim:true,
    },
    
    hocRuns : {
        type : Number,
        trim:true
    },
    
    hocWins : {
        type : Number,
        trim:true
    },

}, { timestamps: true });

module.exports = mongoose.model("hocky", userSchema)