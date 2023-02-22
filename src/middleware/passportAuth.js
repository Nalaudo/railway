const passport = require('passport');
const logger = require('../config/logger');

const signupAuth = () => passport.authenticate('signup', { failureRedirect: '/failSignup' })
const loginAuth = () => passport.authenticate('login', { failureRedirect: '/failLogin' })

module.exports = { signupAuth, loginAuth }