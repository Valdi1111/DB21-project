const express = require("express");
const router = express.Router();
const profile = require("../../services/profile");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const results = await profile.getBuyerProfile(req.user_id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET buyer/profile.");
            next(err);
        }
    }
);

router.put(
    "/",
    async (req, res, next) => {
        try {
            const {name, username, fiscal_code, gender} = req.body;
            await profile.editBuyerProfile(req.user_id, name, username, fiscal_code, gender);
            return res.send();
        } catch (err) {
            console.error("Error on PUT buyer/profile.");
            next(err);
        }
    }
);

module.exports = router;
