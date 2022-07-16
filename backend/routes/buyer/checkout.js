const express = require("express");
const router = express.Router();
const notifications = require("../../services/notifications");
const orders = require("../../services/orders");
const cart = require("../../services/cart");

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {shipment, payment} = req.body;
            const order_res = await orders.addOrder(req.user_id, shipment, payment);
            const order_id = order_res.insertId;
            await orders.addOrderProductsFromCart(req.user_id, order_id);
            await orders.addOrderState(req.user_id, order_id, "created");
            await cart.removeProducts(req.user_id);
            const notification_res = await notifications.create(
                "Your order has been made",
                "We'll take care of your order as soon as possible",
                "order_state",
                order_id);
            const notification_id = notification_res.insertId;
            await notifications.sendToUser(req.user_id, notification_id);
            return res.json({order: order_id, notification: notification_id});
        } catch (err) {
            console.error("Error on POST buyer/checkout.");
            next(err);
        }
    }
);

module.exports = router;
