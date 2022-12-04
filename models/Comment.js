const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    owner:{
        type:String
    },
    remark:{
        type:String,
        max:280
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('comments', commentSchema)