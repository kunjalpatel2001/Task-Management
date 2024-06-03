const express = require("express");
const router = express.Router();
const projectController = require("../controllers/reportControllers");
const auth = require("../middleware/auth");

// *route   GET /find-all
// ?desc    Fetch report
// @access  Admin
router.get("/find-all", auth, projectController.getReport);

// *route    POST /add
// ?desc     Add report
// @access   User
router.post("/add", auth, projectController.addReport);

// *route    PUT /report/:id
// ?desc     Edit report
// @access   Admin
router.put("/edit/:id", auth, projectController.editReport);

// *route    GET /send-report-slack
// ?desc     Send report
// @access   Private
router.get("/send-report-slack", auth, projectController.sendReportSlackChannel);

module.exports = router;