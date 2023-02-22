const config = require('./config')
const mongoose = require('mongoose');
const logger = require('./logger');
const connectMG = async () => {
    try {
        await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true });
    } catch (error) {
        logger.error(error);
        throw 'connectMG failed';
    }
}

module.exports = connectMG()