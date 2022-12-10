const mongoose = require('mongoose')

// Code reused with permission from User.js in mini-film-auth at https://github.com/steliosot/cc.git, with different min and max requirements for
// username and email, and with the addition of a posts field to improve ease of use when identifying user posts
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
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User