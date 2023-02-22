const authMiddle = require('../src/middleware/auth');
const logger = require('../src/config/logger');
const Products = require('../src/models/products');

module.exports = function organics(app) {
    app.get('/organics', authMiddle.auth, async (req, res) => {
        const organics = await Products.find({ category: 'organic' }).exec();
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const email = req.user?.email
        res.render('pages/organics.ejs', { organics, email });
    });
}