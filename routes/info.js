const { fork } = require("child_process");
const logger = require('../src/config/logger');

module.exports = function info(app) {
    app.get('/info', (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        const config = fork('./src/config/config');
        const msg = 'getInfo'
        config.send({ msg })
        config.on("message", (msg) => {
            const { INFO } = msg
            console.log(INFO)
            res.render('pages/info.ejs', { INFO });
        });
    });
}