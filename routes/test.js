const fakerProds = require('../src/mock/faker');
const authMiddle = require('../src/middleware/auth');
const logger = require('../src/config/logger');

module.exports = function test(app) {
    app.get('/api/productosTest', authMiddle.auth, (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        res.render('pages/prods-test.ejs', { fakerProds });
    });
}