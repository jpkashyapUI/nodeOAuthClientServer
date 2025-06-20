const express = require('express');


const app = express();
const session = require('express-session');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const callBackRoute = require('./routes/callBackController');
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profile');
require('dotenv').config()

app.use(session({
    name:'serverSession',
    secret: 'oAuthServer',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60*60*1000   // in milliseconds 
    }
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// For HTML form submissions (default enctype)
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(express.json());

// route middlewares
app.use('/', loginRoute);
app.use('/', registerRoute);
// app.use('/', callBackRoute);
app.use('/', authRoute)
app.use('/',profileRoute)



app.listen(process.env.PORT, () => {
    console.log('Server running at PORT: ' + process.env.PORT);
})

