const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorize');
const { Delivery } = require('../models/delivery');
const { PickUp } = require('../models/pickup');
const { Request, validate } = require('../models/request');

router.get('/', auth, async (req, res) => {// get all requests
    const request = await Request.find().sort('name'); 
    res.send(request);
});

router.post('/', auth, async (req, res)=> {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const pickup = await PickUp.findById(req.body.pickupId);
    if (!pickup) return res.status(400).send('Invalid pickup Id');

    const delivery = await Delivery.findById(req.body.deliveryId);
    if (!delivery) return res.status(400).send('Invalid delivery id');

    let request = new Request({
        pickup: {
            _id: pickup._id,
            name: pickup.name,
            phone: pickup.phone,
            email: pickup.email,
            address: pickup.address,
            category: pickup.category,
            pickupTime: pickup.pickupTime,
        },
        delivery: {
            _id: delivery._id,
            name: delivery.name,
            phone: delivery.phone,
            email: delivery.email,
            address: delivery.address,
        }
    });
    await request.save();
    res.send(request);
});

router.get('/:id', auth, async (req, res) => {// get 1 request
    const request = await Request.findById(req.params.id);
   
    if(!request) return res.status(404).send('The request with the given ID was not found');
    res.send(request);
 });

module.exports = router;