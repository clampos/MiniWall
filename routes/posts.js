const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../tokenVerification')

// GET all
// verifyToken protects posts data from unauthorised users
router.get('/', verifyToken, async(req,res) => {
    try{
        // Await posts, sort by likes descending, then by chronological order if likes are equal
        const posts = await Post.find().sort({likes:-1, timestamp:-1})
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
    })


// POST new post
router.post('/newpost', verifyToken, async(req,res)=> {
// Inserting data
const post = new Post({
    title:req.body.title,
    // TO-DO: how to automatically attach a post to the logged in user
    owner:req.body.owner,
    description:req.body.description
})
try {
    const savedPost = await post.save()
    res.send(savedPost)
} catch(err) {
    res.status(400).send({message:err})
}
})

// UPDATE/PATCH an existing post
router.patch('/:postId', verifyToken, async(req,res)=>{
    try{
    const updatePostById = await Post.updateOne(
        {_id:req.params.postId},
        {$set:{
            title:req.body.title,
            description:req.body.description
        }
    })
    res.send(updatePostById)

}catch(err){
    res.send({message:err})
}
})

// DELETE a post by postId
router.delete('/:postId', verifyToken, async(req,res)=>{
try{
const deletePostById = await Post.deleteOne(
{_id:req.params.postId}
)
res.send(deletePostById)
}catch(err){
res.send({message:err})
}
})

module.exports = router