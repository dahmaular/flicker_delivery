const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorize');
const { PickUp, validate } = require('../models/pickup');

router.get('/', auth, async (req, res)=> {// get all pickups
    try {
        const pickup = await PickUp.find().sort('name');
        res.send(pickup);
    } catch (error) {
        res.status(500).send('something went wrong');
    }
});

router.post('/', auth, async (req, res) => {// add new pickup request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.pickupTime < Date.now()) return res.status(400).send('Pickup time cannot be less than current date');

    let pickup = new PickUp({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        category: req.body.category,
        pickupTime: req.body.pickupTime,
        landmark: req.body.landmark,
        direction: req.body.direction,
        notes: req.body.notes,
    });
    await pickup.save();
    res.send(pickup);
});

router.get('/:id', async (req, res) => {
    const pickup = await PickUp.findById(req.params.id);

    if (!pickup) return res.status(404).send('Pickup not found');
    res.send(pickup);
});

module.exports = router;