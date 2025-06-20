const { connectDB } = require('../config/db')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(403).json({
        success: false,
        message: "Invalid Request!!"
    })

    try {
        const conn = await connectDB(); // create database connection

        // check user exists or not
        const [user] = await conn.query('select * from users where email=?', [email])
        console.log(user)
        if (user.length == 0) return res.status(403).json({
            success: false,
            message: "User does not exists!!"
        })
        // check password 
        console.log(user[0].password)
        console.log(password)
        if (password != user[0].password) return res.status(403).json({
            sucess: false,
            message: 'Incorrect password'
        })

        req.session.user = user;
        // return res.status(200).json({
        //     success:true,
        //     message:"User logged in successfully"
        // })


        const [authClient] = await conn.query('select * from oauth_clients where user_id=?', [user[0].id])
        const clientID = authClient[0].client_id
        const clientSecret = authClient[0].client_secret
        const redirectURL = authClient[0].redirect_url
        const consentUrl = '/consent'

        // const code = uuid.v4();
        // const expires_at = new Date(Date.now() + 2 * 60 * 1000); // 2 min

        
        
        // // redirect to consent page
        res.redirect(`${consentUrl}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=code&scope=name,email&access_type=offline&prompt=consent&client=customoath`);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.data?.message || error?.message
        })
    }
}

module.exports = { login }