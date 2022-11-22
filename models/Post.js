const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        max:64
    },
    owner:{
        type:String
    },
    description:{
        type:String,
        max:280
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('posts', postSchema)