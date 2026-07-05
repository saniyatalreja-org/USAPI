const express = require("express");

const router = express.Router();

const {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing
} = require("../controllers/listingController");

// Create Listing
router.post("/", createListing);

// Get All Listings
router.get("/", getListings);

// Get Single Listing
router.get("/:id", getListingById);

// Update Listing
router.put("/:id", updateListing);

// Delete Listing
router.delete("/:id", deleteListing);

module.exports = router;