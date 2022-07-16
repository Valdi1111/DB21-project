const express = require("express");
const router = express.Router();
const profile = require("../../services/profile");
const coupon = require("../../services/coupon");
const response = require("../../methods/response");

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

router.post(
    "/redeem",
    async (req, res, next) => {
        try {
            const {code} = req.body;
            const results = await coupon.getByCode(code);
            if(!results.length) {
                return response.notFound(res, "coupon_not_found", "No coupon found with code " + code + "!");
            }
            if(results.expired) {
                return response.notFound(res, "coupon_expired", "Coupon with code " + code + " is expired!");
            }
            if(results.used) {
                return response.notFound(res, "coupon_already_redeemed", "Coupon with code " + code + " has already been redeemed!");
            }
            await coupon.use(req.user_id, results[0].id);
            await profile.increaseBuyerBalance(req.user_id, results[0].value);
            return res.send();
        } catch (err) {
            console.error("Error on PUT buyer/profile.");
            next(err);
        }
    }
);

module.exports = router;
