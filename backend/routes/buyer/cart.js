const express = require("express");
const router = express.Router();
const cart = require("../../services/cart");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await cart.getProducts(req.user_id));
        } catch (err) {
            console.error("Error on GET buyer/cart.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {product, amount} = req.body;
            await cart.addProduct(req.user_id, product, amount);
            return res.send();
        } catch (err) {
            console.error("Error on POST buyer/cart.");
            next(err);
        }
    }
);

router.put(
    "/",
    async (req, res, next) => {
        try {
            const {product, amount} = req.body;
            await cart.editProduct(req.user_id, product, amount);
            return res.send();
        } catch (err) {
            console.error("Error on PUT buyer/cart.");
            next(err);
        }
    }
);

router.delete(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cart.removeProduct(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE buyer/cart/:id.");
            next(err);
        }
    }
);

module.exports = router;
