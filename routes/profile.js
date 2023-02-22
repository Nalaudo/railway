const authMiddle = require('../src/middleware/auth');
const logger = require('../src/config/logger');

module.exports = function profile(app) {
    app.get('/profile', authMiddle.auth, (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const user = req?.user
        res.render('pages/profile', { user })
    });
}