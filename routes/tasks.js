const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskCategory,
} = require("../controllers/tasks");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);

router.route("/category").post(getTaskCategory)

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);


module.exports = router;
