const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user:
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ,
    post:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
    timestamp:{
        type:Date,
        default: new Date()
    }
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like