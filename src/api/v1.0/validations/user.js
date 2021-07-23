const Joi = require('joi');

function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phoneNumber: Joi.string().min(5).max(11).required(),
        password: Joi.string().min(5).max(1024).required(),
    };
    return Joi.validate(user, schema);
};

exports.validate = validateUser;