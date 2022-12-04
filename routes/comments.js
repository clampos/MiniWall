const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../tokenVerification')

// GET all comments
router.get('/', verifyToken, async(req,res)=>{
    try{
        const postId = req.params._id
        const getComments = await Comment.find().sort({timestamp:-1})
        res.send(getComments)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// GET by postID: show all comments for a specific post by postID
router.get('/:postId', verifyToken, async(req,res)=>{
    try{
        // const postId = req.params._id
        const getCommentbyPostId = await Comment.findbyId(postId)
        res.send(getCommentbyPostId)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// POST by ID: comment a specific post by postID
router.post('/:postId', verifyToken, async(req,res)=> {
    // Inserting data
    const postId = req.params._id    
     const comment = new Comment({
       owner:req.user._id,
       remark:req.body.remark,
       postId:req.params.postId })
     try {
      const savedComment = await comment.save()

       await Post.updateOne(
               {_id:req.params._id},
               {$push:{comments:savedComment._id} }
           )        
      res.send(savedComment)
     } catch(err) {
       res.status(400).send({message:err})
    }
    })


// PATCH by ID: update a comment by commentID

// DELETE by ID: delete a comment by commentID


module.exports = router