const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment')
const verifyToken = require('../tokenVerification')

// GET by postID: show all comments for a specific post by postID 
router.get('/:postId', verifyToken, async(req,res)=>{
    try{
        const getCommentbyPostId = await Comment.findById(req.params.postId)
        res.send(getCommentbyPostId)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// POST by ID: comment a specific post by postID
router.post('/', verifyToken, async(req,res)=> {
    // Inserting data
    try {
        let postId = req.params.postId
    const comment = new Comment({
        owner:req.user._id,     // This works!
        remark:req.body.remark, // This works!
        linked_post:postId  // Doesn't work
    })
    
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