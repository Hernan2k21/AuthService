const bcrypt = require('bcrypt');
const errorResponses = require('../Responses/error');
const { ClientError } = require('./error');

 async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
    };

   async function validatePassword(receivedPassword, entityPassword){
       const valid = await  bcrypt.compare(receivedPassword, entityPassword);
       if(!valid){
        throw new ClientError(errorResponses.invalid_credentials)
       }
       return
    }

module.exports = {hashPassword, validatePassword}