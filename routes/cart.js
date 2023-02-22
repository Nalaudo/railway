const authMiddle = require('../src/middleware/auth');
const Cart = require('../src/config/cart')
const cart = new Cart()
const logger = require('../src/config/logger');

module.exports = function root(app) {
    app.get('/cart/del', authMiddle.auth, async (req, res) => {
        const user = req.user
        await cart.deleteCart(user)
        res.redirect('/cart');
    });
    app.get('/cart/:id', authMiddle.auth, async (req, res) => {
        const arr = []
        const user = req.user
        const id = req.params.id
        const prod = await cart.findProdById(id)
        arr.push(prod)
        await cart.updateCart(user, arr)
        res.redirect('/cart');
    });
    app.get('/cart', authMiddle.auth, async (req, res) => {
        const user = req.user
        const email = req.user?.email
        const userCart = await cart.findCart(user)
        res.render('pages/cart.ejs', { email, userCart });
    });
}