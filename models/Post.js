const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    title:{
        type:String,
        require:true,
        max:64
    },
    content:{
        type:String,
        max:280
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    
    likes:{
        type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}]
    },
    num_likes:{
        type:Number
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post