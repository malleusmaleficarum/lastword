const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    bodyDesc: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, required: true },
    isAnonymous: { type: Boolean, required: true, default: false },
    commentId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Letter", LetterSchema);
