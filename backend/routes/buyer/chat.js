const express = require("express");
const router = express.Router();
const chat = require("../../services/chat");

router.get(
    "/sellers",
    async (req, res, next) => {
        try {
            return res.json(await chat.getAllSellers(req.user_id));
        } catch (err) {
            console.error("Error on GET buyer/chat/sellers.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            return res.json(await chat.getAllMessages(req.user_id, id));
        } catch (err) {
            console.error("Error on GET buyer/chat/:id.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {seller, message} = req.body;
            await chat.sendMessage(req.user_id, seller, message, true);
            return res.send();
        } catch (err) {
            console.error("Error on POST buyer/chat.");
            next(err);
        }
    }
);

module.exports = router;
