module.exports = {
    user_not_found:{
        httpCode: 404,
        message: 'User not found'
    },
    invalid_credentials:{
        httpCode: 401,
        message: 'Invalid credentials'
    },
    missing_authorization_header: {
        httpCode: 400,
        message: 'Missing Authorization header'
    },
    missing_jwt_in_header: {
        httpCode: 400,
        message: "Missing jwt token in header, sent as 'Bearer <jwt>'"
    },
    missing_refresh_token: {
        httpCode: 400,
        message: "Missing jwt refresh token in body"
    },
    blacklisted_refresh_token: {
        httpCode: 401,
        message: "Provided refresh token has been blacklisted"
    },
    user_invalid_role: {
        httpCode: 401,
        message: "Invalid role to perfom this action"
    }
}