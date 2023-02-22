const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const mailer = require('./nodemailer');
const logger = require('./logger');

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
                    logger.error('User Not Found with email ' + email);
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    logger.error('Invalid password');
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
                            logger.error('Error in SignUp: ' + err);
                            return done(err);
                        }

                        if (user) {
                            logger.error('User already exists');
                            return done(null, false)
                        }

                        const newUser = {
                            email: email,
                            password: createHash(password),
                            nombre: req.body.name,
                            direccion: req.body.adress,
                            edad: req.body.age,
                            telefono: '+' + `${req.body.countryCode}` + `${req.body.phone}`,
                            avatar: req.file
                        };

                        Users.create(newUser, (err, userWithId) => {
                            if (err) {
                                logger.error('Error in Saving user: ' + err);
                                return done(err);
                            }
                            mailer(userWithId, null, 'signupMail')
                            logger.error('User Registration succesful');
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
