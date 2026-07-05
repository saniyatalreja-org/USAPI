const express = require("express");

const router = express.Router();

const {

    createMessage,
    getMessages,
    updateMessage,
    deleteMessage

} = require("../controllers/messageController");

router.post("/", createMessage);

router.get("/", getMessages);

router.put("/:id", updateMessage);

router.delete("/:id", deleteMessage);

module.exports = router;