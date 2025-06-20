const express = require('express');
const registerRoute = express.Router();
const { register } = require('../controllers/registerController')

registerRoute.get('/register', (req, res) => res.render('register'));
registerRoute.post('/register', register)

module.exports = registerRoute;