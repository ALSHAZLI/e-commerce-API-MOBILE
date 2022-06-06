const passportLocal =require("passport-local");
const passport = require("passport");
const User = require("../../models/User");
// import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'phone',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, phone, password, done) => {
            try {
                await User.findUserByEmail(phone).then(async (user) => {
                    if (!user) {
                        console.log('not user sorry');
                        return done(null, false);
                       
                    }
                    if (user) {
                        let match = await User.comparePassword(password, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("errors", match)
                            )
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;