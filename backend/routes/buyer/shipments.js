const express = require("express");
const router = express.Router();
const shipments = require("../../services/shipments");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await shipments.getAll(req.user_id));
        } catch (err) {
            console.error("Error on GET buyer/shipments.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {name, street, civic_number, postal_code, city, district} = req.body;
            const [r1, r2] = await shipments.add(req.user_id, name, street, civic_number, postal_code, city, district)
            return res.json({id: r1.insertId});
        } catch (err) {
            console.error("Error on POST buyer/shipments.");
            next(err);
        }
    }
);

router.delete(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await shipments.remove(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on DELETE buyer/shipments/:id.");
            next(err);
        }
    }
);

module.exports = router;
