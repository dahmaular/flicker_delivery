const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const auth = require('../middleware/authorize');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async(req, res) => {// register new user
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists.');

    user = new User( _.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send( _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']));
});

router.get('/:id', auth, async (req, res) => {//get only 1 user
    const user = await User.findById(req.params.id).select('-password');

    if(!user) return res.status(404).send('No user found');
    res.send(user);
});

router.get('/', auth, async (req, res) => {// get all users
    const user = await User.find().sort('firstName').select('-password');
    res.send(user);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        },
        {
           new: true 
        });

    if (!user) return res.status(404).send('No user with the given id found.');
    res.send(user);
});




module.exports = router;