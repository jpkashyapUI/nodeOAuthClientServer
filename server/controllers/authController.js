const { connectDB } = require("../config/db")
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')


const userInfo = async (req, res) => {
    console.log(req.user.userid)
    try {
        console.log('userinfo api called: ')
        const conn = await connectDB();
        const [userInfo] = await conn.query('select id,name,email,dob from users where email=?', [req.user.userid]);
        console.log(userInfo)

        return res.status(200).json(userInfo[0])



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

const consent = (req, res) => {
    console.log(req.query)
    const { client_id, redirect_uri, client, scope } = req.query;
    if (!req.session.user) return res.redirect('/login');
    res.render('consent', { client_id, redirect_uri, client, scope });
}

const consentCode = async (req, res) => {

    const { client_id, redirect_uri } = req.body;
    const code = uuidv4();
    try {
        const conn = await connectDB();
        const [result] = await conn.query('SELECT * FROM oauth_clients WHERE client_id = ?', [client_id])
        console.log(result);
        res.redirect(`${redirect_uri}?code=${result[0].code}`);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.data?.message || error?.message
        })
    }

}

const token = async (req, res) => {
    console.log('token api')
    console.log(req.body)
    const { code, client_id, client_secret, redirect_uri, grant_type } = req.body;
    if (grant_type !== 'authorization_code') return res.status(400).send('Unsupported grant type');

    try {
        const conn = await connectDB();
        const [result] = await conn.query('SELECT * FROM oauth_clients WHERE client_id = ? AND client_secret = ?', [client_id, client_secret])
        console.log(result);
        if (!result.length) return res.status(400).send('Invalid client');

        const [user] = await conn.query('select email from users where id=?', [result[0].user_id])
        console.log(user)
        console.log(user[0].email)
        console.log('token')
        const token = await jwt.sign({ userid: user[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        console.log(token)

        return res.json({ access_token: token, token_type: 'Bearer' });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.data?.message || error?.message
        })
    }

};


module.exports = { userInfo, consent, consentCode, token }