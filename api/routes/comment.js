const Comment = require("../models/Comment");
const User = require("../models/User");
const Letter = require("../models/Letter");
const { verifySession } = require("../middleware/verifySession");
const router = require("express").Router();

//CREATE COMMENT
router.post("/:letterid", verifySession, async (req, res) => {
  const newComment = new Comment({
    text: req.body.text,
    letterId: req.params.letterid,
    userId: req.body.userId,
  });
  try {
    const savedComment = await newComment.save();
    const populatedComment = await savedComment.populate({
      path: "userId",
      select: ["fullname", "username"],
    });
    await Letter.findByIdAndUpdate(savedComment.letterId, {
      $push: { commentId: savedComment._id },
    });
    await User.findByIdAndUpdate(savedComment.userId, {
      $push: { commentId: savedComment._id },
    });
    res.status(200).json(populatedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE COMMENT
router.put("/:commentId", async (req, res) => {
  try {
    const data = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: { text: req.body.text },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE COMMENT
router.delete("/:commentId", async (req, res) => {
  try {
    const data = await Comment.findByIdAndDelete(req.params.commentId);
    await User.findByIdAndUpdate(data.userId, {
      $pull: { commentId: data._id },
    });
    await Letter.findByIdAndUpdate(data.letterId, {
      $pull: { commentId: data._id },
    });
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ALL COMMMENTS in ONE LETTER
router.get("/:letterid", async (req, res) => {
  try {
    const comments = await Comment.find({ letterId: req.params.letterid })
      .skip(req.query.skip)
      .limit(3)
      .sort({ createdAt: -1 }) //DESCENDING
      .populate({ path: "userId", select: ["fullname", "username", "image"] });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
