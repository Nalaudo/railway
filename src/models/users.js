const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    avatar: { type: Object, required: true },
    cart: { type: Array, required: false }
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users