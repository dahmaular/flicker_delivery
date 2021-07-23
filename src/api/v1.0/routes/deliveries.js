const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorize');
const { Delivery, validate } = require('../models/delivery');

router.get('/', auth, async (req, res)=> {// get all deliveries
    try {
        const delivery = await Delivery.find().sort('name');
        res.send(delivery);
    } catch (error) {
        res.status(500).send('something went wrong');
    }
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let delivery = new Delivery({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        landmark: req.body.landmark,
        direction: req.body.direction,
        notes: req.body.notes,
    });
    await delivery.save();
    res.send(delivery);
});

router.get('/:id', async (req, res) => {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) return res.status(404).send('Pickup not found');
    res.send(delivery);
});

module.exports = router;