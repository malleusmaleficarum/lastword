const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
    },
    password: { type: String, required: true },
    image: { type: String, default: null },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: String, required: true, default: "inactive" },
    isVerify: { type: Boolean, required: true, default: false },
    lastPost: { type: Date, default: null },
    letterId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Letter", default: null },
    ],
    commentId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    ],
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
