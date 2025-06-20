const express = require('express');
const { consent, consentCode, token } = require('../controllers/authController');
const authRoute = express.Router();

authRoute.get('/consent', consent)

authRoute.post('/consent', consentCode)

authRoute.post('/token', token)

module.exports = authRoute;