const resetPassword = require("../controllers/resetPassword");

const express = require("express");
const router = express.Router();

router.route("/").post(resetPassword);

module.exports = router;
