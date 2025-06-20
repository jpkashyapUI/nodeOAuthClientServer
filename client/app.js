const express =  require('express');
const session = require('express-session');
require('dotenv').config();
const app = express();
const oAuthRoutes = require('./routes/oAuthRoute');
// set the view engine to ejs
app.set('view engine', 'ejs');

const PORT = 3000;

app.use(session({
  name:'clientSession',
  secret: 'socialLogin',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 60000   // in milliseconds 
  } 
}));

app.use('/',oAuthRoutes)

app.get('/',(req,res)=>{
  res.send('welcome to node app')
})

app.listen(PORT,()=>{
    console.log('Server running at PORT: '+PORT);
})