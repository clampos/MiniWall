const joi = require('joi')

// Authentications for user registrations
// Code reused with permission from validation.js in mini-film-auth at https://github.com/steliosot/cc.git
const registerAuthentication = (data) => {
    const schemaAuthentication = joi.object({
        username:joi.string().required().min(4).max(256),
        email:joi.string().required().min(7).max(256).email(),
        password:joi.string().required().min(6).max(1024),
    })
    return schemaAuthentication.validate(data)
}

// Authentications for user logins
const loginAuthentication = (data) => {
    const schemaAuthentication = joi.object({
        email:joi.string().required().min(7).max(256).email(),
        password:joi.string().required().min(6).max(1024),
    })
    return schemaAuthentication.validate(data)
}

module.exports.registerAuthentication = registerAuthentication
module.exports.loginAuthentication = loginAuthentication