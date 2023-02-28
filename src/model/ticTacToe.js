const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    ticMatch: {
        type : Number,
        trim:true,
    },
    
    ticWins : {
        type : Number,
        trim:true
    },

}, { timestamps: true });

module.exports = mongoose.model("ticTacToe", userSchema)