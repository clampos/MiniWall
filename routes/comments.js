const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const verifyToken = require('../tokenVerification')

// GET all comments - WORKS
router.get('/', verifyToken, async(req,res)=>{
    try{
        const getComments = await Comment.find().sort({timestamp:-1})
        res.send(getComments)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// GET by postID: show all comments for a specific post by postID - DOESN'T WORK
router.get('/:postId', verifyToken, async(req,res)=>{
    const postId = req.params.postId
    try{
        const result = await Comment.find({post:postId}).populate('content')
        res.send(result)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// POST by ID: comment a specific post by postID - WORKS
router.post('/:postId', verifyToken, async(req,res)=> {
    const postId = req.params._id
    // Inserting data
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
      console.log(newComment.post)
     } catch(err) {
       res.status(400).send({message:err})
    }
    })


// PATCH by ID: update a comment by commentID
router.patch('/:commentId', verifyToken, async(req,res)=>{
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
})

// DELETE by ID: delete a comment by commentID
router.delete('/:commentId', verifyToken, async(req,res)=>{
    try{
    const deleteCommentById = await Comment.deleteOne(
    {_id:req.params.commentId}
    )
    res.send(deleteCommentById)
    }catch(err){
    res.send({message:err})
    }
    })

module.exports = router