const { connectDB } = require('../config/db');
const jwt = require('jsonwebtoken')


const callback = async (req, res) => {
    const code = req.query.code
    const clientID = req.query.clientId
    const redirectURL = req.query.redirectUrl
    const id = req.query.id;
    const email = req.query.email;

    try {
        // token creation for authorization
        const token = await jwt.sign({ userid: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });


        // fetch user info 
        const userInfoResponse = await fetch('http://localhost:5000/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });
        const userData = await userInfoResponse.json();






    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }

}

module.exports = { callback }