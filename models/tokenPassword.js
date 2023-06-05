const mongoose = require("mongoose");

const tokenPasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    expires: 36000,
  }
);

module.exports = mongoose.model("TokenPassword", tokenPasswordSchema);
