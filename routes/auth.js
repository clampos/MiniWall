const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerAuthentication, loginAuthentication} = require('../authentications/authentication')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res) => {
    // Authentication 1 to check user input
    const {error} = registerAuthentication(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Authentication 2 to check if user exists
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) {
        return res.status(400).send({message:'User already exists :('})
    }

    // Creating a hashed representation of the password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash.apply(req.body.password, salt)

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