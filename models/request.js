const mongoose = require('mongoose');
const Joi = require('joi');
const { pickUpSchema } = require('./pickup');
const { deliverySchema } = require('./delivery');

const requestSchema = new mongoose.Schema({
    pickup: {
        type: pickUpSchema,
        required: true
    },
    delivery: {
        type: deliverySchema,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    fulfilled: {
        type: Number,
        required: true,
        default: 0
    },
    paid: {
        type: Number,
        default: 0
    }
});

const Request = mongoose.model('Request', requestSchema);

function validateRequest(request) {
    const schema = {
        pickupId: Joi.objectId().required(),
        deliveryId: Joi.objectId().required(),
    };

    return Joi.validate(request, schema);
}

exports.requestSchema = requestSchema;
exports.Request = Request;
exports.validate = validateRequest;