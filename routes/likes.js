const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const User = require('../models/User')
const verifyToken = require('../tokenVerification')

// PATCH like by ID: like a specific post by postID - WORKS
router.patch('/:postId', verifyToken, async(req,res)=> {
    // Author tries to like own post
    const post = await Post.findById(req.params.postId)
    if (post.user == req.user._id) {
      res.status(401).send("401 Error: User cannot like own post :(")
    }

    // Non-author tries to like post
    else {
    try{
      const likedPost = await Post.updateOne(
        {_id:req.params.postId},
        {$inc:{likes:1}}
      )
      res.send(likedPost)
     } catch(err) {
       res.status(400).send({message:err})
    }
    }
  }
  )
module.exports = router