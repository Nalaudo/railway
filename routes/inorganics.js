const authMiddle = require('../src/middleware/auth');
const logger = require('../src/config/logger');
const Products = require('../src/models/products');

module.exports = function inorganics(app) {
    app.get('/inorganics', authMiddle.auth, async (req, res) => {
        const inorganics = await Products.find({ category: 'inorganic' }).exec();
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const email = req.user?.email
        res.render('pages/inorganics.ejs', { inorganics, email });
    });
}