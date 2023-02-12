const passportAuth = require('../src/middleware/passportAuth');
const logger = require('../src/config/logger');

module.exports = function login(app) {
    app.get('/login', (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const email = req.user?.email;
        if (req.isAuthenticated()) {
            res.redirect('/profile');
        } else {
            res.render('pages/login', { email });
        }
    });
    app.get('/failLogin', (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        res.render("pages/fail-login");
    });
    app.post('/login', passportAuth.loginAuth(), (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        res.redirect('/profile')
    });
}