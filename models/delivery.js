const mongoose = require('mongoose');
const Joi = require('joi');

const deliverySchema = new mongoose.Schema({
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

const Delivery = mongoose.model('Delivery', deliverySchema);

function validateDelivery(delivery) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().min(5).max(11).required(),
        address: Joi.string().min(3).max(255).required(),
        landmark: Joi.string().min(3).max(255),
        direction: Joi.string().min(3).max(255),
        notes: Joi.string().min(3).max(255),
    };

    return Joi.validate(delivery, schema);
}

exports.deliverySchema =deliverySchema;
exports.Delivery = Delivery;
exports.validate = validateDelivery;