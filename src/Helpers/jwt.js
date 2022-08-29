
const config = require('../../config/app.config')
const jwt = require('jsonwebtoken')
const { ClientError } = require('./error')
const {jwtToken,  jwtRefreshToken} = config
function createJwtToken (payload) {
    const options ={
        expiresIn: jwtToken.expiresIn
    }
    const token = jwt.sign(payload, jwtToken.jwtSecretOrKey, options)
    return token
}

function createJwtRefreshToken (payload) {
    const options ={
        expiresIn: jwtRefreshToken.expiresIn
    }
    const token = jwt.sign(payload, jwtRefreshToken.jwtSecretOrKey, options)
    return token
}
function verifyJwtToken (token) {
    let tokenData
   jwt.verify(token, jwtToken.jwtSecretOrKey, function(e, decoded) {
        if (e) {
            throw new ClientError(e)
        }
      tokenData = decoded;
      
    })
    return tokenData
}
function verifyJwtRefreshToken (token) {
    let tokenData
   jwt.verify(token, jwtRefreshToken.jwtSecretOrKey, function(e, decoded) {
        if (e) {
            throw new ClientError(e)
        }
      tokenData = decoded;
      
    })
    return tokenData
}
module.exports = {createJwtToken, createJwtRefreshToken, verifyJwtToken, verifyJwtRefreshToken}