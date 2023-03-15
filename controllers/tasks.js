const { default: mongoose } = require("mongoose");
const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const tasks = await Task.find({ userId: id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskCategory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Categories Id is required" });
  }

  try {
    const tasks = await Task.find({
      'categoryId': {
        $in: id
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOne({ _id });
    if (!task) {
      return res.status(404).json([{ message: "Task not found" }]);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOneAndDelete({ _id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, getTaskCategory };
