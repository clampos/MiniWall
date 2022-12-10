// Installation of libraries (code reused with permission from app.js in mini-film-auth at https://github.com/steliosot/cc.git)
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome to MiniWall RESTful API')
})

// Routes set (code reused with permission from app.js in mini-film-auth at https://github.com/steliosot/cc.git)
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const commentsRoute = require('./routes/comments')
const likesRoute = require('./routes/likes')

app.use('/api/posts', postsRoute)
app.use('/api/user', authRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/likes', likesRoute)

//Connection to MongoDB (code reused with permission from app.js in mini-film-auth at https://github.com/steliosot/cc.git)
mongoose.connect(process.env.DB_CONNECTOR, ()=> {
    console.log('Connected to the database...')
})

// Listening to port 3000 (code reused with permission from app.js in mini-film-auth at https://github.com/steliosot/cc.git)
app.listen(3000, ()=> {
    console.log('The server is up and running...')
})

