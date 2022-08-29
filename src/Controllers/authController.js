const {createUser, findUserByEmail, findUserById} = require('../Actions/users')
const userSchema = require('../Validations/Schemas/user')
const {validateSchema} = require('../Validations')
const { ClientError } = require('../Helpers/error')
const errorResponses = require('../Responses/error')
const succesResponses = require('../Responses/succes')
const {validatePassword} = require('../Helpers/password')
const { createJwtToken, createJwtRefreshToken, verifyJwtToken, verifyJwtRefreshToken } = require('../Helpers/jwt')
const emailLoginSchema = require('../Validations/Schemas/login')
const {redisClient} = require('../Helpers/redis')
module.exports = {
	async register(req, res, next) {
        try { 
            const userData = await validateSchema(req.body, userSchema)
            
            const user = await createUser(userData)

			res.status(200).json(user)
            
        }catch(e){

            next(e)
        }
	},

	async login(req, res, next) {
		try {
		const loginData = await validateSchema(req.body, emailLoginSchema)
		const {email, password} = loginData
		const user = await findUserByEmail(email)
		if(!user){
			throw new ClientError(errorResponses.user_not_found)
		}
		await validatePassword(password, user.password)
		let jwtPayload = {id: user.id, name: user.name, roles: user.Roles.map(rol =>rol.name)}
		let refreshTokenPayload = {id: user.id, email: user.email, roles: user.Roles.map(rol =>rol.name)}
		const jwtToken = createJwtToken (jwtPayload)
		const userInWhitelist = await redisClient.get(user.email)
		let jwtRefreshToken
		if(!userInWhitelist){
			jwtRefreshToken = createJwtRefreshToken(refreshTokenPayload )
			const userData = {
				user: jwtPayload,
				refreshToken: jwtRefreshToken
			}
			await redisClient.set(user.email, JSON.stringify(userData));

		}else{
			jwtRefreshToken = JSON.parse(userInWhitelist).refreshToken
		}
		res.status(200).json({token: jwtToken, refreshToken: jwtRefreshToken })
		} catch (e) {
			next(e)
		}
	},
	async verifyToken(req, res, next) {
		try {
			const header = req.headers['authorization']
			if(!header) throw new ClientError(errorResponses.missing_authorization_header)
			const jwtToken = header.split(' ')[1]
			if(!jwtToken) throw new ClientError(errorResponses.missing_jwt_in_header)
			const decoded = verifyJwtToken(jwtToken)
			res.status(200).json(decoded)
			  
		} catch (e) {
			next(e)
		}
	},
	async refreshToken(req, res, next) {
		try {
			const providedJwtRefreshToken = req.body.refreshToken
			if(!providedJwtRefreshToken) throw new ClientError(errorResponses.missing_refresh_token)
			const decoded = verifyJwtRefreshToken(providedJwtRefreshToken)
			const userInWhitelist = await redisClient.get(decoded.email || "")
			const whitelistedJwtRefreshToken = userInWhitelist ? JSON.parse(userInWhitelist).refreshToken : null
			if(providedJwtRefreshToken !== whitelistedJwtRefreshToken){
				throw new ClientError(errorResponses.blacklisted_refresh_token)
			}
			const jwtPayload = {id: decoded.id, email: decoded.email, roles: decoded.roles}
			const jwtToken = createJwtToken(jwtPayload)
			res.status(200).json({
				jwtToken: jwtToken
			})
		} catch (e) {
			next(e)
		}
	},
	async blacklistRefreshToken(req, res, next) {
		try {
			const user = await findUserById(req.body.userID)
			if(!user){
				throw new ClientError(errorResponses.user_not_found)
			}

			await redisClient.del(user.email)

			res.status(200).json(succesResponses.blacklisted_user_token)

			  
		} catch (e) {
			next(e)
		}
	}
		
}
