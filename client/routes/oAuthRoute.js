const express = require('express');
const oAuthRoutes = express.Router();
const { loginControls, consent, Callback } = require('../controllers/oAuthController');
const { dashboard, logout } = require('../controllers/dashboardController')


// Get page login controls
oAuthRoutes.get('/login', loginControls)


// go to consent screen
oAuthRoutes.get('/auth/:loginType', consent)

// callback

oAuthRoutes.get('/auth/:loginType/callback', Callback)


oAuthRoutes.get('/dashboard',dashboard)

oAuthRoutes.post('/logout', logout);



module.exports = oAuthRoutes;

