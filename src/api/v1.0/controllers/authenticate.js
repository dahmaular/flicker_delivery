const bcrypt = require('bcrypt');
const _ = require('lodash');

const { validate } = require("../validations/authenticate");
const { User } = require('../models/user');

exports.userLogin = async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    try {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']));
    } catch (error) {
        console.log(error);
    }
   
};
