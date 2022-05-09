const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    letterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Letter",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
