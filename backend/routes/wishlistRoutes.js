const express = require("express");

const router = express.Router();

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require("../controllers/wishlistController");

router.post("/", addToWishlist);

router.get("/:user_id", getWishlist);

router.delete("/:id", removeFromWishlist);

module.exports = router;