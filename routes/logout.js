const authMiddle = require('../src/middleware/auth');
const logger = require('../src/config/logger');

module.exports = function logout(app) {
    app.get('/logout', authMiddle.auth, (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const email = req.user?.email;
        req.logout(function (err) {
            if (err) logger.info(err);
            else res.render('pages/logout', { email });
        });
    });
}