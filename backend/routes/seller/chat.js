const express = require("express");
const router = express.Router();
const chat = require("../../services/chat");

router.get(
    "/buyers",
    async (req, res, next) => {
        try {
            return res.json(await chat.getAllBuyers(req.user_id));
        } catch (err) {
            console.error("Error on GET seller/chat/buyers.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await chat.getAllMessages(id, req.user_id));
        } catch (err) {
            console.error("Error on GET seller/chat/:id.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {buyer, message} = req.body;
            await chat.sendMessage(buyer, req.user_id, message, false);
            return res.send();
        } catch (err) {
            console.error("Error on POST seller/chat.");
            next(err);
        }
    }
);

module.exports = router;
