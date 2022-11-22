const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        requre:true,
        min:4,
        max:256
    },
    email:{
        type:String,
        require:true,
        min:7,
        max:256
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('users', userSchema)