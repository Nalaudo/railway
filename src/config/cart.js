const Products = require('../models/products');
const Users = require('../models/users');
const logger = require('./logger');

class Cart {

    async findCart(user) {
        try {
            let res = await Users.findOne({ email: user.email });
            return res.cart;
        } catch (error) {
            logger.error(error);
        };
    }

    async updateCart(user, newProds) {
        try {
            const cart = await this.findCart(user);
            const newCart = [...cart, ...newProds];
            const res = newCart.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                }
                return false;
            });
            await Users.updateOne({ email: user.email }, { cart: res });
        } catch (error) {
            logger.error(error);
        };
    }

    async findProdById(id) {
        try {
            const prod = await Products.findById(id).exec()
            return prod;
        } catch (error) {
            logger.error(error);
        };
    }

    async deleteCart(user) {
        try {
            const cart = [];
            const res = await Users.updateOne({ email: user.email }, { cart: cart });
            return res;
        } catch (error) {
            logger.error(error)
        }
    }

}

module.exports = Cart;