const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Like = require('../models/Like')
const verifyToken = require('../tokenVerification')

// PATCH like by ID: like a specific post by postID - WORKS
router.patch('/:postId', verifyToken, async(req,res)=> {
    // Inserting data
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
  )

module.exports = router