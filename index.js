const express=require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { default: mongoose } = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
const passportConfig =require('./services/passport');



//connect to mongoDB through Mongoose.

mongoose.connect(keys.mongoURI);

//create mangoose Model class

//creates an app
const app=express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);



const PORT =process.env.PORT || 3000;

app.listen(PORT);




// app.get('/',(req,res)=>{

// res.send("Hello Srija")

// })




