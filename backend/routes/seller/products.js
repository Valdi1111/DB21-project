const express = require("express");
const router = express.Router();
const products = require("../../services/products");
const response = require("../../methods/response");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const {search, limit, offset} = req.query;
            return res.json(await products.getSellerProducts(req.user_id, search, limit, offset));
        } catch (err) {
            console.error("Error on GET seller/products.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await products.getSellerProduct(req.user_id, id);
            // nothing found
            if (!results.length) {
                return response.notFound(res, "product_not_found", "No product found with id " + id + "!");
            }
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET seller/products/:id.");
            next(err);
        }
    }
);

router.put(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {title, description, description_full, price, discount, amount, visible} = req.body;
            await products.editSellerProduct(req.user_id, id, title, description, description_full, price, discount, amount, visible);
            return res.send();
        } catch (err) {
            console.error("Error on PUT seller/products/:id.");
            next(err);
        }
    }
);

router.post(
    "/:id/images",
    multer({dest: "./uploads/products/"}).single("image"),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const image = req.file.filename;
            const ext = path.extname(req.file.originalname).toLowerCase();
            if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
                return response.badRequest(res, "invalid_image", "The image provided is invalid!");
            }
            const results = await products.addImage(req.user_id, id, image);
            return res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on POST seller/products/images/:id.");
            next(err);
        }
    }
);

router.put(
    "/images/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {order} = req.body;
            await products.editImage(req.user_id, id, order);
            return res.send();
        } catch (err) {
            console.error("Error on PUT seller/products/images/:id.");
            next(err);
        }
    }
);

// TODO remove file from disk
router.delete(
    "/images/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await products.removeImage(req.user_id, id);
            // TODO remove file from disk
            //const file = path.join(__dirname, "..", "..", "uploads", "products", results1[0].path);
            //fs.unlinkSync(file);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE seller/products/images/:id.");
            next(err);
        }
    }
);

router.get(
    "/:id/faqs",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await products.getUnansweredFaqs(req.user_id, id));
        } catch (err) {
            console.error("Error on GET seller/products/:id/faqs.");
            next(err);
        }
    }
);

router.put(
    "/faqs/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {answer} = req.body;
            await products.editFaqAnswer(req.user_id, id, answer);
            return res.send();
        } catch (err) {
            console.error("Error on PUT seller/products/faqs/:id.");
            next(err);
        }
    }
);

router.delete(
    "/faqs/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await products.deleteFaq(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE seller/products/faqs/:id.");
            next(err);
        }
    }
);

module.exports = router;
