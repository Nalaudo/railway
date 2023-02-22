const logger = require('./logger')
require('dotenv').config()
const yargs = require('yargs/yargs')(process.argv.slice(0))
const ARGS = yargs.argv
const PORT = ARGS._[2] || 8080
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET = process.env.SECRET
process.on('message', ({ msg }) => {
    if (msg == 'getInfo') {
        const INFO = {
            platform: process.platform,
            version: process.version,
            rss: process.memoryUsage().rss,
            path: process.argv[1],
            pid: process.pid,
            folder: process.cwd()
        }
        process.send({ INFO })
    }
})

module.exports = {
    ARGS,
    PORT,
    MONGO_CONNECTION,
    SECRET
}