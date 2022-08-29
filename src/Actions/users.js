
const Sequelize     = require('sequelize');
const userModel      = require('../Database/models').User;
const roleModel  = require('../Database/models').Role;
const roleUserModel = require('../Database/models').UserRole;
const {hashPassword} = require('../Helpers/password')

const createUser = async (userData) => {
    try {
        const {name, email, password} = userData
        const user = await userModel.create({name, email, password: await hashPassword(password)})
        return user
    } catch (e) {
        throw(e)
    }
     
}
const findUserByEmail = async (userEmail) => {
    
     const user = await userModel.findOne({
        where: {
            email: userEmail
            
        }, 
        include: [{model: roleModel , attributes: ['name'], through: {attributes: []}}],
       
     })
     return user
}
const findUserById = async (userId) => {
    
    const user = await userModel.findOne({
       where: {
           id: userId
       },
       raw: true
    })
    return user
}
module.exports = {createUser,findUserByEmail, findUserById}