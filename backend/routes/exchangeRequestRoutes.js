const express = require("express");

const router = express.Router();

const {

    createExchangeRequest,
    getExchangeRequests,
    updateExchangeRequest,
    deleteExchangeRequest

} = require("../controllers/exchangeRequestController");

router.post("/", createExchangeRequest);

router.get("/", getExchangeRequests);

router.put("/:id", updateExchangeRequest);

router.delete("/:id", deleteExchangeRequest);

module.exports = router;