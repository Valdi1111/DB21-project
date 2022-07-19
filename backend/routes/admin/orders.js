const express = require("express");
const router = express.Router();
const orders = require("../../services/orders");
const response = require("../../methods/response");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await orders.getAllAdmin());
        } catch (err) {
            console.error("Error on GET admin/orders/actives.");
            next(err);
        }
    }
);

router.put(
    "/:id/state",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {state} = req.body;
            return res.json(await orders.addOrderState(id, state));
        } catch (err) {
            console.error("Error on PUT admin/orders/:id/state.");
            next(err);
        }
    }
);

module.exports = router;
