const Joi = require("joi");

const userSchema = Joi.when(
    Joi.ref("$updating"), {
          "is": "true",
          "then": Joi.object().keys({
            "name": Joi.string().min(3).max(15),
            "email": Joi.string().email(),
            "password": Joi.string().min(8).max(32)
          }).min(1),
          "otherwise": Joi.object().keys({
            "name": Joi.string().min(3).max(15),
            "email": Joi.string().email(),
            "password": Joi.string().min(8).max(32)
          }).options({ presence: 'required' }).required()
        }
        );


module.exports = userSchema