const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    value: {
        type: Number,
        required:true
    },
    trades: [
        {
            coin:{
                type:String,
                required:true
            },
            coinPrice:{
                type:Number,
                required:true
            },
            buyAmount:{
                type:Number,
                required:true
            },
            sellAmount:{
                type:Number,
                required:true
            },
            date:{
                type:Date,
                default: Date.now
            }
        }
    ],
    assets: [
        {
            coin:{
                type:String
            },
            amount:{
                type:Number,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);