const passport = require('passport');

const signupAuth = () => passport.authenticate('signup', { failureRedirect: '/failSignup' })
const loginAuth = () => passport.authenticate('login', { failureRedirect: '/failLogin' })

module.exports = { signupAuth, loginAuth }