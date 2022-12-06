const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    content:{
        type:String,
        max:280
    },
    post:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
    timestamp:{
        type:Date,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment