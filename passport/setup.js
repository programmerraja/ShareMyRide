const bcrypt = require("bcryptjs");

const User = require("../models/Users");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(new LocalStrategy({ usernameField: "email" },AuthUser));

async function AuthUser(email, password, done)
{
       // Match User
        try{
            let user= await User.findOne({email:email});
            if (user) {
                let hash=user.password;   
                 if(!bcrypt.compareSync(hash,password)){
                            return done(null, user);
                }
                else{

                     return done(null, false, { message: "Password does not match"});  
                }
             }
             else{
                 return done(null, false, { message: "No user exit" });   
             }
            }
        catch (e){
            return done(e);
        }
}
module.exports = passport;