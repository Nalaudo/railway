module.exports = function routes(app) {
    const root = require('./root')(app)
    const info = require('./info')(app)
    const randoms = require('./randoms')(app)
    const test = require('./test')(app)
    const prod = require('./prod')(app)
    const login = require('./login')(app)
    const signup = require('./signup')(app)
    const logout = require('./logout')(app)
    const profile = require('./profile')(app)
    const notFound = require('./notFound')(app)
    const routes = {
        root,
        info,
        randoms,
        test,
        prod,
        login,
        signup,
        logout,
        profile,
        notFound
    }
    return routes
}