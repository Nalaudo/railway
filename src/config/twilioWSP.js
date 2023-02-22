const logger = require('./logger');
const accountSid = 'ACc6889f9f228d14971b9c164228f20f06';
const authToken = process.env.TWILIO_WSP;
const client = require('twilio')(accountSid, authToken);

const twilioWSP = (user) => {
    const ADMIN = '+5493425324333'
    if (user.telefono) {
        client.messages
            .create({
                body: 'Tu pedido ha sido recibido y se encuentra en proceso',
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${user.telefono}`
            })
            .then(message => logger.info(message.sid))
        client.messages
            .create({
                body: `Nuevo pedido de ${user.nombre}, email: ${user.email}`,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${ADMIN}`
            })
            .then(message => logger.info(message.sid))
    }
}



module.exports = twilioWSP