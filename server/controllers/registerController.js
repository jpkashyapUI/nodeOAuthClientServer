const { connectDB } = require('../config/db');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {

    const { email, password, name } = req.body;
    // check if email and password are present
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request!!'
        })
    }
    try {
        const conn = await connectDB();
        // check if user already registered or not
        const [user] = await conn.query('select * from users where email=?', [email])
        if (user.length != 0) return res.status(403).json({
            success: false,
            message: "User already exists!!"
        })

        const [result] = await conn.query('insert into users (email,password,name) values (?,?,?)', [email, password, name]);
   

        // generating random client_id and client_secret for oAuth login
        const clientId = crypto.randomBytes(16).toString('hex');
        const clientSecret = crypto.randomBytes(32).toString('hex');
        const code = uuidv4();

        const [updateClientIDSecret] = await conn.query('insert into oauth_clients (client_id,client_secret,redirect_url,user_id,code) values (?,?,?,?,?)', [clientId, clientSecret, 'http://localhost:5000/callback', result.insertId,code])


        // res.status(201).json({
        //     success: true,
        //     message: 'User registered successfully!!'
        // })

        res.render('login')
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.data?.message || error?.message
        })
    }

}

module.exports = { register }