const Joi = require('@hapi/joi');


//Register Validation
const registerValidation = data => {
    const valSchema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return valSchema.validate(data);
}

const loginValidation = data => {
    const valSchema = Joi.object({
        email: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return valSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;