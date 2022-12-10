const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerAuthentication, loginAuthentication} = require('../authentications/authentication')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

// POST: register a new user - WORKS
// Code reused with permission from auth.js in mini-film-auth at https://github.com/steliosot/cc.git
router.post('/register', async(req,res) => {
    console.log(req.body)

    // Authentication 1 to check user input
    const {error} = registerAuthentication(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Authentication 2 to check if user exists (username)
    const userExists_1 = await User.findOne({username:req.body.username})
    if(userExists_1) {
        return res.status(400).send({message:'An account with the same username already exists'})
    }

    // Authentication 3 to check if user exists (email)
    const userExists_2 = await User.findOne({email:req.body.email})
    if(userExists_2) {
        return res.status(400).send({message:'An account is already registered to this email address'})
    }

    // Creating a hashed representation of the password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    // Inserting data
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

// POST: login an existing user - WORKS
// Code reused with permission from auth.js in mini-film-auth at https://github.com/steliosot/cc.git
router.post('/login', async(req,res) => {
    // Authentication 1 to check user input
    const {error} = loginAuthentication(req.body)
    if(error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Authentication 2 to check if user exists
    const user = await User.findOne({email:req.body.email})
    if(!user) {
        return res.status(400).send({message:'User does not exist :('})
    }

    // Authentication 3 to check user password
    const passwordAuthentication = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordAuthentication) {
        return res.status(400).send({message: 'Password is wrong! :('})
    }

    // Generate an auth-token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token': token})
})

module.exports = router
