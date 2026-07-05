const express = require("express");

const router = express.Router();

const {

    createUniversity,
    getUniversities,
    updateUniversity,
    deleteUniversity

} = require("../controllers/universityController");

// CREATE
router.post("/", createUniversity);

// READ
router.get("/", getUniversities);

// UPDATE
router.put("/:id", updateUniversity);

// DELETE
router.delete("/:id", deleteUniversity);

module.exports = router;