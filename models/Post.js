const { array } = require('joi')
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
    likes:{
        type:Number,
        default:0
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('posts', postSchema)