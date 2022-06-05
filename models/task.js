const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [240, "Task name must be less than 240 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: "none",
    maxlength: 30,
  },
  comments: {
    type: String,
    maxlength: [240, "Comments must be less than 240 characters"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
