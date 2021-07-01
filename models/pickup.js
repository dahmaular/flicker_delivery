const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const pickUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required:true,
        minlength: 3,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11
    },
    address: {
        type: String,
        required:true,
        minlength: 3,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    pickupTime: {
        type: Date,
        required: true,
    },
    landmark: {
        type: String,
        minlength: 3,
        maxlength: 255
    },
    direction: {
        type: String,
        minlength: 3,
        maxlength: 255
    },
    notes: {
        type: String,
        minlength: 3,
        maxlength: 255
    }
});

const PickUp = mongoose.model('PickUp', pickUpSchema);

function validatePickup(pickup) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().min(5).max(11).required(),
        address: Joi.string().min(3).max(255).required(),
        category: Joi.string().min(3).max(255).required(),
        pickupTime: Joi.date().required(),
        landmark: Joi.string().min(3).max(255),
        direction: Joi.string().min(3).max(255),
        notes: Joi.string().min(3).max(255),
    };

    return Joi.validate(pickup, schema);
}

exports.pickUpSchema = pickUpSchema;
exports.PickUp = PickUp;
exports.validate = validatePickup;