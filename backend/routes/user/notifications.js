const express = require("express");
const router = express.Router();
const notifications = require("../../services/notifications");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await notifications.getAllUnread(req.user_id));
        } catch (err) {
            console.error("Error on GET user/notifications.");
            next(err);
        }
    }
);

router.get(
    "/amount",
    async (req, res, next) => {
        try {
            const results = await notifications.getAmount(req.user_id);
            return res.json(results[0]);
        } catch (err) {
            console.error("Error on GET user/notifications/amount.");
            next(err);
        }
    }
);

router.get(
    "/history",
    async (req, res, next) => {
        try {
            return res.json(await notifications.getAllRead(req.user_id));
        } catch (err) {
            console.error("Error on GET user/notifications/history.");
            next(err);
        }
    }
);

router.post(
    "/:id/read",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await notifications.read(req.user_id, id);
            return res.send();
        } catch (err) {
            console.error("Error on POST user/notifications/:id/read.");
            next(err);
        }
    }
);

module.exports = router;
