const express = require('express');

const callBackRoute = express.Router();
const { callback } = require('../controllers/callBackConntroller');

callBackRoute.get('/callback',callback)

module.exports = callBackRoute;