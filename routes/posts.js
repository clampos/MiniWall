const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const User = require('../models/User')
const verifyToken = require('../tokenVerification')

// 1a: GET all posts
// verifyToken protects posts data from unauthorised users
router.get('/', verifyToken, async(req,res) => {
    try{
        // Await posts, sort by likes descending, then by chronological order if likes are equal
        const posts = await Post.find().sort({likes:-1, timestamp:-1}).populate('user').populate('comments')
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
    })

// 1b: GET single post by ID
router.get('/postbyid/:postId', verifyToken, async(req,res)=>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.status(400).send({message:err})
    }})
  
// 1c: GET all posts by a user
router.get('/userposts/:userId', verifyToken, async(req,res)=>{
    try{
        const userPosts = await Post.find({user:req.params.userId}).sort({timestamp:-1}).populate('comments')
        res.send(userPosts)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// 2: POST new post
router.post('/', verifyToken, async(req,res)=> {
// Inserting data

const post = new Post({
    user:req.user._id,
    title:req.body.title,
    content:req.body.content
})
try {
    const savedPost = await post.save()
    await User.updateOne(
        {_id:req.user._id},
        {$push:{posts:savedPost._id}}
      )

    res.send(savedPost)
} catch(err) {
    res.status(400).send({message:err})
}
})

// 3: UPDATE/PATCH an existing post
router.patch('/:postId', verifyToken, async(req,res)=>{
    // Non-author tries to update post
    const postId = req.params._id
    const post = await Post.findById(req.params.postId)
    if (post.user != req.user._id) {
      res.status(401).send("401 Error: User cannot update another's post :(")
    }
    else {

    // Author tries to update post
    try{
    const updatePostById = await Post.updateOne(
        {_id:req.params.postId},
        {$set:{
            title:req.body.title,
            content:req.body.content
        }
    })
    res.send(updatePostById)

}catch(err){
    res.send({message:err})
}
}
})

// 4: DELETE a post by postId
router.delete('/:postId', verifyToken, async(req,res)=>{
// Non-author tries to delete post
const postId = req.params._id
const post = await Post.findById(req.params.postId)
if (post.user != req.user._id) {
    res.status(401).send("401 Error: User cannot delete another's post :(")
}
else {
// Author tries to delete post
try{
const deletePostById = await Post.deleteOne(
{_id:req.params.postId}
)
res.send(deletePostById)
}catch(err){
res.send({message:err})
}
}
})

module.exports = router