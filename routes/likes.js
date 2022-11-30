const express = require('express')
const router = express.Router()

const Like = require('../models/Like')
const verifyToken = require('../tokenVerification')



module.exports = router