const express = require("express");
const router = express.Router();
const orders = require("../../services/orders");
const response = require("../../methods/response");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await orders.getAll(req.user_id));
        } catch (err) {
            console.error("Error on GET buyer/orders.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await orders.get(req.user_id, id);
            // nothing found
            if (!results.length) {
                return response.conflict(res, "order_not_found", "No order found with id " + id + "!");
            }
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET buyer/orders/:id.");
            next(err);
        }
    }
);

router.get(
    "/:id/products",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await orders.getOrderProducts(req.user_id, id));
        } catch (err) {
            console.error("Error on GET buyer/orders/:id/products.");
            next(err);
        }
    }
);

router.get(
    "/:id/states",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await orders.getOrderStates(req.user_id, id));
        } catch (err) {
            console.error("Error on GET buyer/orders/:id/states.");
            next(err);
        }
    }
);

module.exports = router;
