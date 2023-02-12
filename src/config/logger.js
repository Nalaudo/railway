const winston = require('winston')
const LEVEL = Symbol.for('level');

function filterOnly(level) {
    return winston.format(function (info) {
        if (info[LEVEL] === level) {
            return info;
        }
    })();
}
const logger = winston.createLogger({
    level: "warn",
    transports: [
        new winston.transports.Console({ level: "info", format: filterOnly('info') }),
        new winston.transports.File({ level: "warn", format: filterOnly('warn'), filename: 'warn.log' }),
        new winston.transports.File({ level: "error", format: filterOnly('error'), filename: 'error.log' })
    ]
})

module.exports = logger