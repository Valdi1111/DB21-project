const express = require("express");
const router = express.Router();
const response = require("../../methods/response");
const profile = require("../../services/profile");
const multer = require("multer");
const path = require("path");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const results = await profile.getUserData(req.user_id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET user/data.");
            next(err);
        }
    }
);

router.put(
    "/avatar",
    multer({dest: "./uploads/avatars/"}).single("avatar"),
    async (req, res, next) => {
        try {
            const avatar = req.file.filename;
            const ext = path.extname(req.file.originalname).toLowerCase();
            if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
                return response.badRequest(res, "invalid_image", "The image provided is invalid!");
            }
            await profile.editUserAvatar(req.user_id, avatar);
            return res.send();
        } catch (err) {
            console.error("Error on PUT user/data/avatar.");
            next(err);
        }
    }
);

router.get(
    "/address",
    async (req, res, next) => {
        try {
            const results = await profile.getUserAddress(req.user_id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET user/data/address.");
            next(err);
        }
    }
);

router.put(
    "/address",
    async (req, res, next) => {
        try {
            const {street, civic_number, postal_code, city, district} = req.body;
            await profile.editUserAddress(req.user_id, street, civic_number, postal_code, city, district);
            return res.send();
        } catch (err) {
            console.error("Error on PUT user/data/address.");
            next(err);
        }
    }
);

module.exports = router;
