const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [140, "Task name must be less than 240 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Categories",
    },
    comments: {
      type: String,
      maxlength: [240, "Comments must be less than 240 characters"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: {
      type: Date,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
