const express = require("express");
const router = express.Router();
const profile = require("../../services/profile");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const results = await profile.getSellerProfile(req.user_id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET seller/profile.");
            next(err);
        }
    }
);

router.put(
    "/",
    async (req, res, next) => {
        try {
            const {name, vat} = req.body;
            await profile.editSellerProfile(req.user_id, name, vat);
            return res.send();
        } catch (err) {
            console.error("Error on PUT seller/profile.");
            next(err);
        }
    }
);

module.exports = router;
