const { register, login, createNewPassword } = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/new-password", createNewPassword);

module.exports = router;
