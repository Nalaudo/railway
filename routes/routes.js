module.exports = function routes(app) {
    const root = require('./root')(app)
    const info = require('./info')(app)
    const randoms = require('./randoms')(app)
    const test = require('./test')(app)
    const prod = require('./prod')(app)
    const organics = require('./organics')(app)
    const inorganics = require('./inorganics')(app)
    const login = require('./login')(app)
    const signup = require('./signup')(app)
    const logout = require('./logout')(app)
    const profile = require('./profile')(app)
    const cart = require('./cart')(app)
    const checkout = require('./checkout')(app)
    const notFound = require('./notFound')(app)
    const routes = {
        root,
        info,
        randoms,
        test,
        prod,
        organics,
        inorganics,
        login,
        signup,
        logout,
        profile,
        cart,
        checkout,
        notFound
    }
    return routes
}