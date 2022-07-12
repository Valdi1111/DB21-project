const express = require("express");
const router = express.Router();
const shipments = require("../../services/shipments");
const address = require("../../services/address");
const response = require("../../methods/response");

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
            const addressRes = await address.add(street, civic_number, postal_code, city, district)
            if (!addressRes.insertId) {
                // error creating address
                return response.internalError(res, "Error creating address!");
            }
            await shipments.add(req.user_id, name, addressRes.insertId)
            return res.json({id: addressRes.insertId});
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
