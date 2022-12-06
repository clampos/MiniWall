const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
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
    posts:
        [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    ,
    date:{
        type:Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User