const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../tokenVerification')

// verifyToken protects posts data from unauthorised users
router.get('/', verifyToken, async(req,res) => {
    try{
        const posts = await Post.find()
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
    })

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

module.exports = router