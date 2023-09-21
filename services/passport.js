const passport =require('passport');
const GoogleStrategy= require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys=require('../config/keys');

const User=mongoose.model('users');

//serialize a user

passport.serializeUser((user, done)=>{
    done(null,user.id);
});

// deserialize user

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},
(accessToken,refreshToken,profile,done) =>{

    User.findOne({googleId:profile.id}).then(existingUser =>{
        if(existingUser){
            //we already ahve a record with profile id
            done(null,existingUser);
        }else{

            new User({
                googleId: profile.id
            }).save().then(user => done(null,user));
            
         }
    })

    //if profile doesn't exists.
    // new User({
    //     googleId: profile.id
    // }).save();
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
}
));