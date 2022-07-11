const express = require("express");
const router = express.Router();
const notifications = require("../../services/notifications");
const orders = require("../../services/orders");
const cart = require("../../services/cart");
//const response = require("../../methods/response");
//const db = require("../../services/db");

/*
router.post(
    "/",
    (req, res, next) => {
        const {shipment, payment} = req.body;
        // add product amount in cart or add amount if already present
        db.query(
            `INSERT INTO \`order\` (payment_type, payment_data, shipment_id)
             VALUES ('', '', ${db.escape(shipment)});`,
            (err, result, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                const id = result.insertId;
                db.query(
                    `INSERT INTO order_has_product (order_id, product_id, amount, price)
                     SELECT ${id},
                            p.id,
                            c.amount,
                            p.price * (100 - p.discount) / 100
                     FROM cart c
                              INNER JOIN product p ON c.product_id = p.id
                     WHERE c.buyer_id = ${db.escape(req.user_id)};`,
                    (err, result, fields) => {
                        // db error
                        if (err) {
                            return response.internalError(res, err);
                        }
                        db.query(
                            `INSERT INTO order_has_state (order_id, state)
                             VALUES (${id}, 'created');`,
                            (err, result, fields) => {
                                // db error
                                if (err) {
                                    return response.internalError(res, err);
                                }
                                db.query(
                                    `DELETE
                                     FROM cart c
                                     WHERE c.buyer_id = ${db.escape(req.user_id)};`,
                                    (err, result, fields) => {
                                        // db error
                                        if (err) {
                                            return response.internalError(res, err);
                                        }
                                        db.query(
                                            `INSERT INTO notification (title, description, type, data)
                                             VALUES ('Your order has been made',
                                                     'We\\'ll take care of your order as soon as possible',
                                                     'order_state', '${id}');`,
                                            (err, result, fields) => {
                                                const notification = result.insertId;
                                                // db error
                                                if (err) {
                                                    return response.internalError(res, err);
                                                }
                                                db.query(
                                                    `INSERT INTO user_has_notification (user_id, notification_id)
                                                     VALUES (${db.escape(req.user_id)}, ${notification});`,
                                                    (err, result, fields) => {
                                                        // db error
                                                        if (err) {
                                                            return response.internalError(res, err);
                                                        }
                                                        // send response
                                                        return res.send();
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
*/

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
