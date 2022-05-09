const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reason: { type: String, required: true },
    letterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Letter",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
