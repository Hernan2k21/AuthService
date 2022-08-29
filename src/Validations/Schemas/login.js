const Joi = require("joi");
const emailLoginSchema = Joi.object().keys({
    "email": Joi.string().email(),
    "password": Joi.string()
});

module.exports = emailLoginSchema