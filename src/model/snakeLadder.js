const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({


    snakMatch: {
        type : Number,
        trim:true,
    },
    
    snakWins : {
        type : Number,
        trim:true
    },
    

}, { timestamps: true });

module.exports = mongoose.model("snakeLadder", userSchema)