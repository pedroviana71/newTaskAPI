const Categories = require("../models/categories");
const { StatusCodes } = require("http-status-codes");

const getCategories = async (req, res) => {
    const userId = req.headers.id;

    try {
        const categories = await Categories.find({ userId });
        res.status(StatusCodes.OK).json(categories);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const userId = req.headers.id;
        const category = await Categories.create({ userId, name, color });
        res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json(category);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByIdAndUpdate(id);
        res.status(StatusCodes.OK).json(category);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

module.exports = { getCategories, createCategory, deleteCategory, updateCategory };