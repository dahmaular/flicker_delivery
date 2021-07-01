const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true        
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phoneNumber: Joi.string().min(5).max(11).required(),
        password: Joi.string().min(5).max(1024).required(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;