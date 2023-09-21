const passport = require('passport');

module.exports= app => {

app.get(
    '/auth/google',
    passport.authenticate('google',{
    scope:['profile','email']
}
));

//when user is redirected with a code from google

app.get('/auth/google/callback',passport.authenticate('google'));

app.get('/api/current_user',(req,res) => {
    res.send(req.user);
});

}

