const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        max:64
    },
    owner:{
        type:String
    },
    description:{
        type:String,
        max:280
    },
    comments:[
        {
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
}],
    
    likes:{
        type:[]
    },
    num_likes:{
        type:Number
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('posts', postSchema)