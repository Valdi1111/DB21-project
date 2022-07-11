const express = require("express");
const router = express.Router();
const products = require("../services/products");
const response = require("../methods/response");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const {category, max_price, min_price, search, limit, offset} = req.query;
            return res.json(await products.getProducts(category, max_price, min_price, search, limit, offset));
        } catch (err) {
            console.error("Error on GET products.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await products.getProduct(id);
            // nothing found
            if (!results.length) {
                return response.notFound(res, "product_not_found", "No product found with id " + id + "!");
            }
            if (!results[0].visible) {
                return response.notFound(res, "product_not_available", "Product with id " + id + " isn't available right now!");
            }
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET products/:id.");
            next(err);
        }
    }
);

router.get(
    "/:id/images",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await products.getImages(id));
        } catch (err) {
            console.error("Error on GET products/:id/images.");
            next(err);
        }
    }
);

router.get(
    "/:id/ratings",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            let results = {};
            const rating = await products.getRating(id);
            results.average = rating.length !== 0 ? rating[0].average : 0;
            results.amount = rating.length !== 0 ? rating[0].amount : 0;
            results.ratings = await products.getAllRatings(id);
            return res.json(results);
        } catch (err) {
            console.error("Error on GET products/:id/ratings.");
            next(err);
        }
    }
);

router.get(
    "/:id/faqs",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await products.getFaqs(id));
        } catch (err) {
            console.error("Error on GET products/:id/faqs.");
            next(err);
        }
    }
);

router.get(
    "/:id/reviews",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {order_by} = req.query;
            let order_type;
            if (order_by === "date") {
                order_type = "r.created";
            }
            if (order_by === "helpful") {
                order_type = "upvotes";
            }
            if (!order_type) {
                return response.badRequest(res, "invalid_parameter", "Parameter order_by is invalid!");
            }
            return res.json(await products.getReviews(id, order_type));
        } catch (err) {
            console.error("Error on GET products/:id/reviews.");
            next(err);
        }
    }
);

module.exports = router;
