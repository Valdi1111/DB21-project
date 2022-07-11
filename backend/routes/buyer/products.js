const express = require("express");
const router = express.Router();
const products = require("../../services/products");
const response = require("../../methods/response");
const path = require("path");
const multer = require("multer");

router.post(
    "/:id/faqs",
    async (req, res, next) => {
        try {
            const {question} = req.body;
            const {id} = req.params;
            const results = await products.addFaq(id, question);
            return res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on GET buyer/products/:id/faqs.");
            next(err);
        }
    }
);

router.get(
    "/faqs/:id/upvote",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await products.getFaqUpvote(req.user_id, id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET buyer/products/faqs/:id/upvote.");
            next(err);
        }
    }
);

router.post(
    "/faqs/:id/upvote",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {vote} = req.body;
            await products.editFaqUpvote(req.user_id, id, vote);
            return res.send();
        } catch (err) {
            console.error("Error on POST buyer/products/faqs/:id/upvote.");
            next(err);
        }
    }
);

router.post(
    "/:id/reviews",
    multer({dest: "./uploads/reviews/"}).single("image"),
    async (req, res, next) => {
        try {
            const {title, description, rating} = req.body;
            const {id} = req.params;
            if (req.file) {
                const image = req.file.filename;
                const ext = path.extname(req.file.originalname).toLowerCase();
                if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
                    return response.badRequest(res, "invalid_image", "The image provided is invalid!");
                }
                const results = await products.addReview(req.user_id, id, title, description, image, rating);
                return res.json({id: results.insertId});
            }
            const results = await products.addReview(req.user_id, id, title, description, null, rating);
            return res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on POST buyer/products/:id/reviews.");
            next(err);
        }
    }
);

router.get(
    "/reviews/:id/helpful",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await products.getReviewHelpful(req.user_id, id);
            if (!results.length) {
                return response.notFound(res, "review_not_found", "No review found with id " + id + "!");
            }
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET buyer/products/reviews/:id/helpful.");
            next(err);
        }
    }
);

router.post(
    "/reviews/:id/helpful",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await products.addReviewHelpful(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on POST buyer/products/reviews/:id/helpful.");
            next(err);
        }
    }
);

router.delete(
    "/reviews/:id/helpful",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await products.deleteReviewHelpful(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE buyer/products/reviews/:id/helpful.");
            next(err);
        }
    }
);

module.exports = router;
