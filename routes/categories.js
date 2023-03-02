const {
    getCategories,
    createCategory,
} = require("../controllers/categories");

const express = require("express");
const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
