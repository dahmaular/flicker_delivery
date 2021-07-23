const bcrypt = require('bcrypt');
const _ = require('lodash');
const {validate} = require("../validations/user");

const { User } = require("../models/user");

exports.registerUser = async (userData, res) => {
    const { error } = validate(userData);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: userData.email });
    if (user) return res.status(400).send('User already exists.');

    user = new User( _.pick(userData, ['firstName', 'lastName', 'email', 'phoneNumber', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send( _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']));

};

exports.getUser = async (userId, res) => {
    const user = await User.findById(userId).select('-password');

    if(!user) return res.status(404).send('No user found');
    res.send(user);
};

exports.getUsers = async (res) => {
    const user = await User.find().sort('firstName').select('-password');
    res.send(user);
};

exports.updateUser = async (data, res) => {
    const { error } = validate(data.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(data.params.id,
        {
            firstName: data.body.firstName,
            lastName: data.body.lastName,
            email: data.body.email,
            phoneNumber: data.body.phoneNumber,
        },
        {
           new: true 
        });

    if (!user) return res.status(404).send('No user with the given id found.');
    res.send(user);
}