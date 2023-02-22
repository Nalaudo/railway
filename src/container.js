const Products = require('./models/products');
const Messages = require('./models/messages');
const Users = require('./models/users');
const logger = require('./config/logger');

class Container {
    constructor(coll) {
        this.coll = coll;
    };

    async getAll() {
        try {
            let res = undefined;
            if (this.coll == "products") {
                res = await Products.find({});
            } else if (this.coll == "messages") {
                res = await Messages.find({});
            } else if (this.coll == "users") {
                res = await Users.find({});
            };
            return res;
        } catch (e) {
            logger.error(e);
        };
    };

    async save(item) {
        try {
            let res = undefined;
            if (this.coll == "products") {
                res = await new Products(item);
            } else if (this.coll == "messages") {
                res = await new Messages(item);
            } else if (this.coll == "users") {
                res = await Users(item);
            };
            await res.save();
        } catch (e) {
            logger.error(e);
        };
    }

    async saveNewProd(producto, id) {
        try {
            const carritos = await this.getAll();
            let carritoSelec = carritos.filter(item => item.id == id);
            let carritoProds = carritoSelec[0].prods;
            carritoProds.push(producto);
            await Messages.findByIdAndUpdate(id, {
                prods: carritoProds
            });
        } catch (e) {
            logger.error(e)
        };
    };

    async getById(id) {
        try {
            let res = undefined
            if (this.coll == "products") {
                res = await Products.findById(id);
            } else if (this.coll == "messages") {
                res = await Messages.findById(id);
            };
            return res;
        } catch (e) {
            logger.error(e);
        };
    };

    async getByTitle(title) {
        try {
            const res = await Products.findOne({ title: title }).exec();
            return res;
        } catch (e) {
            logger.error(e);
        };
    };

    async getByEmail(email) {
        try {
            const res = await Users.findOne({ email: email }).exec();
            return res;
        } catch (e) {
            logger.error(e);
        };
    };

    async deleteProdById(id, id_prod) {
        try {
            const carritos = await this.getAll();
            const carritoEncontrado = carritos.find((e) => e.id == id);
            if (!carritoEncontrado) return logger.info("el id no existe");
            const prods = carritoEncontrado.prods;
            const carritosFiltrados = prods.filter((e) => e.id != id_prod);
            await Messages.findByIdAndUpdate(
                id,
                {
                    prods: carritosFiltrados
                }
            );
            logger.info("producto borrado");
        } catch (e) {
            logger.error(e);
        };
    };

    async deleteById(id) {
        try {
            if (this.coll == "products") {
                await Products.deleteOne({ _id: id });
            } else if (this.coll == "messages") {
                await Messages.deleteOne({ _id: id });
            } else if (this.coll == "users") {
                res = await Users.deleteOne({ _id: id });
            };
            logger.info("item borrado");
        } catch (e) {
            logger.error(e);
        };
    };

    async deleteAll() {
        try {
            if (this.coll == "products") {
                await Products.deleteMany({});
            } else if (this.coll == "messages") {
                await Messages.deleteMany({});
            } else if (this.coll == "users") {
                res = await Users.deleteMany({});
            };
            logger.info("se borraron todos los items");
        } catch (e) {
            logger.error(e);
        };
    };

    async updateById(id, title, price, thumbnail) {
        try {
            await Products.findByIdAndUpdate(
                id,
                {
                    title: title,
                    price: price,
                    thumbnail: thumbnail
                }
            );
        } catch (e) {
            logger.error(e);
        };
    };
};

module.exports = Container;