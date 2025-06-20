const express = require('express');
const profileRoute = express.Router();
const {authentication} = require('../middlewares/authMiddleware');
const { userInfo } = require('../controllers/authController');

profileRoute.get('/userInfo',authentication,userInfo)

module.exports = profileRoute;