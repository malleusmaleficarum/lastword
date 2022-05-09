const Report = require("../models/Report");
const router = require("express").Router();

//CREATE REPORT
router.post("/", async (req, res) => {
  const newReport = new Report({
    reason: req.body.reason,
    letterId: req.body.letterId,
    userId: req.body.userId,
  });
  try {
    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
