const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const response = require("../methods/response");

router.get(
    "/avatars/:id",
    (req, res, next) => {
        const {id} = req.params;
        const file = path.join(__dirname, "..", "uploads", "avatars", id);
        if (fs.existsSync(file)) {
            return res.sendFile(file);
        }
        return response.notFound(res, "image_not_found", "No image found with name " + id + "!");
    }
);

router.get(
    "/products/:id",
    (req, res, next) => {
        const {id} = req.params;
        const file = path.join(__dirname, "..", "uploads", "products", id);
        if (fs.existsSync(file)) {
            return res.sendFile(file);
        }
        return response.notFound(res, "image_not_found", "No image found with name " + id + "!");
    }
);

router.get(
    "/reviews/:id",
    (req, res, next) => {
        const {id} = req.params;
        const file = path.join(__dirname, "..", "uploads", "reviews", id);
        if (fs.existsSync(file)) {
            return res.sendFile(file);
        }
        return response.notFound(res, "image_not_found", "No image found with name " + id + "!");
    }
);

module.exports = router;