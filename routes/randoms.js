const { fork } = require("child_process");
const logger = require('../src/config/logger');

module.exports = function randoms(app) {
    app.get('/api/randoms', (req, res) => {
        logger.info('Ruta: ' + req.originalUrl + ' - Método: ' + req.method)
        let cant = req.query.cant
        const msg = 'start'
        let randoms = fork('./src/utils/randoms');
        const port = process.argv[2]
        if (cant) {
            randoms.send({ msg, cant });
            randoms.on("message", (msg) => {
                const { data } = msg;
                res.render('pages/randoms.ejs', { cant: data, port });
            });
        } else {
            cant = 100000000
            randoms.send({ msg, cant });
            randoms.on("message", (msg) => {
                const { data } = msg;
                res.render('pages/randoms.ejs', { cant: data, port });
            });
        }
    });
}