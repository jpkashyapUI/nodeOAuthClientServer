const querystring = require('querystring');
const connectDB = require('../config/db')

const loginControls = async (req, res) => {
    try {
        const conn = await connectDB();

        const [result] = await conn.query('SELECT pl.pageName,pc.labelType,pc.inputType FROM page_list AS pl INNER JOIN page_config AS pc ON pl.pageId = pc.pageId WHERE pl.pageName = ?', ['login'])

        res.render('login', { pageConfig: result }); // Renders views/login.ejs

    } catch (error) {
        res.send('Error Before Navigating')
    }
}

let authConfig;

const consent = async (req, res) => {
    try {
        console.log(req.params.loginType)

        const conn = await connectDB();

        const [result] = await conn.query('SELECT * FROM oauthconfig WHERE config_name = ?', [req.params.loginType])


        authConfig = result[0];


        const redirect_uri = authConfig.consent_url + querystring.stringify({
            client_id: authConfig.app_id,
            redirect_uri: authConfig.callback_url,
            response_type: 'code', //the response_type parameter determines which authorization flow is used and what kind of token or code is returned in the first step of the process.
            scope: authConfig.scopes,
            access_type: 'offline',
            prompt: 'consent',
            client:req.params.loginType
        });

        res.redirect(redirect_uri);

    } catch (error) {

    }

}


const Callback = async (req, res) => {
    const code = req.query.code;
    debugger;

    // Exchange code for tokens
    const postData = querystring.stringify({
        code,
        client_id: authConfig.app_id,
        client_secret: authConfig.secret_key,
        redirect_uri: authConfig.callback_url,
        grant_type: 'authorization_code',
    });

    const tokenResponse = await fetch(authConfig.accesstoken_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
        },
        body: postData,
    });
    console.log(tokenResponse)
    const tokenData = await tokenResponse.json();
    console.log(tokenData)
    const access_token = tokenData.access_token;


    // Get user info
    const userInfoResponse = await fetch(authConfig.userinfo_api, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },

    });
    console.log(userInfoResponse)
    const userData = await userInfoResponse.json();
    console.log(userData)

    const { id, email, name } = userData;

    // connect to mysql
    const db = await connectDB();

    // Save user to MySQL
    const [rows] = await db.query('SELECT * FROM users WHERE socialLogin_id = ?', [id]);
    if (rows.length === 0) {
        await db.query(
            'INSERT INTO users ( name, email, loginVia,socialLogin_id) VALUES (?, ?, ?, ?)',
            [name, email, authConfig.config_name, id]
        );
    }

    req.session.userData = userData;

    res.redirect('/dashboard'); // Renders views/dashboard.ejs

    // res.json({
    //     message: 'Google login successful',
    //     user: { id: id, name: name, email: email },
    // });
};

module.exports = { loginControls, consent, Callback }