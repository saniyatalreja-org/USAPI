const express = require("express");

const router = express.Router();

const {

    createProjectRequest,
    getProjectRequests,
    updateProjectRequest,
    deleteProjectRequest

} = require("../controllers/projectRequestController");

router.post("/", createProjectRequest);

router.get("/", getProjectRequests);

router.put("/:id", updateProjectRequest);

router.delete("/:id", deleteProjectRequest);

module.exports = router;