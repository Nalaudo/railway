const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    function createHash(password) {
        return bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(10),
            null);
    }

    function isValidPassword(user, password) {
        return bcrypt.compareSync(password, user.password);
    }

    passport.use('login', new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        (email, password, done) => {
            Users.findOne({ email: email }, (err, user) => {

                if (err)
                    return done(err);

                if (!user) {
                    console.log('User Not Found with email ' + email);
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    console.log('Invalid password');
                    return done(null, false);
                }

                return done(null, user);
            });
        })
    );

    passport.use('signup', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
            passwordField: "password"
        },
        (req, email, password, done) => {
            Users.findOne({ email: email }, function (err, user) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    const { passwordRepeat } = req.body
                    if (password === passwordRepeat) {
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }

                        if (user) {
                            console.log('User already exists');
                            return done(null, false)
                        }

                        const newUser = {
                            email: email,
                            password: createHash(password),
                        };
                        Users.create(newUser, (err, userWithId) => {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                return done(err);
                            }
                            console.log(user + '1121212121')
                            console.log('User Registration succesful');
                            return done(null, userWithId);
                        });
                    } else {
                        return done(null, false)
                    }
                }
                else {
                    return done(null, false)
                };
            });
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        Users.findById(id, done);
    });
};
