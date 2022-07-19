const express = require("express");
const router = express.Router();
const profile = require("../../services/profile");
const notifications = require("../../services/notifications");
const shipments = require("../../services/shipments");
const payments = require("../../services/payments");
const orders = require("../../services/orders");
const cart = require("../../services/cart");
const response = require("../../methods/response");

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {shipment, payment} = req.body;
            const shipment_res = await shipments.getById(req.user_id, shipment);
            if(!shipment_res.length) {
                return response.conflict(res, "shipment_not_found", "No shipment found with code " + shipment + "!");
            }
            const payment_res = await payments.getById(req.user_id, payment);
            if(!payment_res.length) {
                return response.conflict(res, "payment_not_found", "No payment found with code " + payment + "!");
            }
            //const cart_res = await cart.getProducts(req.user_id, order_id);
            // Create order
            const order_res = await orders.addOrder(shipment_res[0].id, payment_res[0].type, payment_res[0].owner);
            const order_id = order_res.insertId;
            await orders.addOrderProductsFromCart(req.user_id, order_id);
            await orders.addOrderState(order_id, "created");
            await cart.removeProducts(req.user_id);
            // Remove money from balance
            const order = await orders.get(req.user_id, order_id);
            const t = order[0].total;
            await profile.decreaseBuyerBalance(req.user_id, t);
            // Send notification
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
