const express = require('express');
const { login } = require('../controllers/loginController');
const loginRoute = express.Router();

loginRoute.get('/login', (req, res) => res.render('login'));
loginRoute.post('/login',login)

module.exports = loginRoute