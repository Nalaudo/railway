const passportAuth = require('../src/middleware/passportAuth');
const logger = require('../src/config/logger');
const upload = require('../src/config/multer');

module.exports = function signup(app) {
    app.get('/signup', (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const email = req.user?.email;
        if (req.isAuthenticated()) {
            res.redirect('/profile');
        } else {
            res.render('pages/signup', { email });
        }
    });
    app.get('/failSignup', (req, res) => {
        res.render("pages/fail-signup");
    });
    app.post('/signup', upload, passportAuth.signupAuth(), (req, res) => {
        res.redirect('/profile');
    });
}