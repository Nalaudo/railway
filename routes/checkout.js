const mailer = require('../src/config/nodemailer');
const twilioWSP = require('../src/config/twilioWSP');
const authMiddle = require('../src/middleware/auth');
const Cart = require('../src/config/cart')
const cartOptions = new Cart()
const logger = require('../src/config/logger');

module.exports = function root(app) {
    app.get('/checkout', authMiddle.auth, async (req, res) => {
        const user = req?.user
        const email = req.user?.email
        const cart = req.user?.cart
        twilioWSP(user)
        twilioWSP('+5493425324333')
        mailer(user, cart, 'checkoutMail')
        await cartOptions.deleteCart(user)
        res.render('pages/checkout.ejs', { email });
    });
}