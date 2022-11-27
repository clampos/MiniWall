const jsonwebtoken = require('jsonwebtoken')

// Takes token from header; if token is correct, user can continue, otherwise access denied or invalid token
function authorise(req,res,next){
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({message:'Access denied :('})
    }
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch(err) {
        return res.status(401).send({message:'Invalid token :('})
    }
}

module.exports = authorise