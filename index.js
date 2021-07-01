const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./routes/users');
const auth = require('./routes/authenticate');
const pickup = require('./routes/pickups');
const delivery = require('./routes/deliveries');
const request = require('./routes/requests');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined!');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/flicker_delivery')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error());

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/pickup', pickup);
app.use('/api/delivery', delivery);
app.use('/api/request', request);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));