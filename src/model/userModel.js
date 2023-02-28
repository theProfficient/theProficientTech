const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

   UserId: {
        type: String,
        trim: true
    },
    Name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    
    phone: {
        type: String,
        unique: true,
        trim: true
    },
   
    }, { timestamps: true });

module.exports = mongoose.model("GammingUser", userSchema)

