const config = require('../config/config')
const mongoose = require('mongoose');

const connectMG = async () => {
    try {
        await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true });
    } catch (error) {
        console.log(error);
        throw 'connectMG failed';
    }
}

module.exports = connectMG()