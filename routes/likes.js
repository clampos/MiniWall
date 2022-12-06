const express = require('express')
const router = express.Router()

const Like = require('../models/Like')
const verifyToken = require('../tokenVerification')

// PATCH like by ID: like a specific post by postID
router.patch('/:postId', verifyToken, async(req,res)=> {
    const postId = req.params._id
    // Inserting data
     const like = new Like({
       user: req.user._id,
       post: req.params.postId})
     try {
      const newLike = await like.save()
      await Post.updateOne(
        {_id:req.params.postId},
        {$push:{likes:newLike._id}, $inc: {num_likes:1}}
      )
      res.send(newLike)
     } catch(err) {
       res.status(400).send({message:err})
    }
    })

module.exports = router