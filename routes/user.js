const { getUser } = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.get("/", getUser);

module.exports = router;
