const express = require("express");
const router = express.Router();
const payments = require("../../services/payments");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await payments.getAll(req.user_id));
        } catch (err) {
            console.error("Error on GET buyer/payments.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {type, number, owner, expire} = req.body;
            const results = await payments.add(req.user_id, type, number, owner, expire)
            return res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on POST buyer/payments.");
            next(err);
        }
    }
);

router.delete(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await payments.remove(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE buyer/payments/:id.");
            next(err);
        }
    }
);

module.exports = router;
