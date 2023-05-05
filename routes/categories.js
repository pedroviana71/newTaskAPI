const {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} = require("../controllers/categories");

const express = require("express");
const router = express.Router();

router.route("/").get(getCategories).post(createCategory).delete(deleteCategory).patch(updateCategory)

module.exports = router;
