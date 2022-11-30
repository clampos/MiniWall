const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    owner:{
        type:String
    },
    postId:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('likes', likeSchema)