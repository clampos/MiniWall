const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

// TO-DO routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use('/api/posts', postsRoute)
app.use('/api/user', authRoute)

mongoose.connect(process.env.DB_CONNECTOR, ()=> {
    console.log('Connected to the database...')
})

app.listen(3000, ()=> {
    console.log('The server is up and running...')
})

