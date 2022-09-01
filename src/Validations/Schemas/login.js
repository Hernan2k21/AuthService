const Joi = require("joi");
const emailLoginSchema = Joi.object().keys({
    "email": Joi.string().email(),
    "password": Joi.string().min(8).max(32)
}).options({ presence: 'required' }).required();

module.exports = emailLoginSchema