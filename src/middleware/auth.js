const Conatiner = require('../container');
const users = new Conatiner("users")

async function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(401).redirect('/login')
}

module.exports = { auth }