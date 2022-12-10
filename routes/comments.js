const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const verifyToken = require('../tokenVerification')

// 1a: GET all comments by a user
router.get('/usercomments/:userId', verifyToken, async(req,res)=>{
    try{
        const userComments = await Comment.find({user:req.params.userId}).sort({timestamp:-1})
        res.send(userComments)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// 1b: GET by postID: show all comments for a specific post by postID
router.get('/:postId', verifyToken, async(req,res)=>{
    const postId = req.params.postId
    try{
        const result = await Comment.find({post:postId}).sort({timestamp:-1}).populate('content')
        res.send(result)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// 2: POST by ID: comment a specific post by postID
router.post('/:postId', verifyToken, async(req,res)=> {
    const postId = req.params._id
    // Author tries to comment own post
    const post = await Post.findById(req.params.postId)
    if (post.user == req.user._id) {
      res.status(401).send("401 Error: User cannot comment own post :(")
    }
    // Non-author tries to comment post
    else {
     const comment = new Comment({
       user: req.user._id,
       content:req.body.content,
       post: req.params.postId})
     try {
      const newComment = await comment.save()
      await Post.updateOne(
        {_id:req.params.postId},
        {$push:{comments:newComment._id}}
      )

      res.send(newComment)
     } catch(err) {
       res.status(400).send({message:err})
    }
    }
})


// 3: PATCH by ID: update a comment by commentID
router.patch('/:commentId', verifyToken, async(req,res)=>{
    // Non-author tries to update comment
    const commentId = req.params._id
    const comment = await Comment.findById(req.params.commentId)
    if (comment.user != req.user._id) {
      res.status(401).send("401 Error: User cannot update another's comment :(")
    }
    else {

    // Author tries to update comment
    try{
    const updateCommentById = await Comment.updateOne(
        {_id:req.params.commentId},
        {$set:{
            content:req.body.content
        }
    })
    res.send(updateCommentById)

}catch(err){
    res.send({message:err})
            }
        }       
    }
)

// 4: DELETE by ID: delete a comment by commentID

router.delete('/:commentId', verifyToken, async(req,res)=>{
// Non-author tries to delete comment
const commentId = req.params._id
const comment = await Comment.findById(req.params.commentId)
if (comment.user != req.user._id) {
    res.status(401).send("401 Error: User cannot delete another's comment :(")
}
else {
// Author tries to delete comment
    try{
    const deleteCommentById = await Comment.deleteOne(
    {_id:req.params.commentId}
    )
    res.send(deleteCommentById)
    }catch(err){
    res.send({message:err})
    }
    }
})

module.exports = router