const router = require("express").Router();
const { json } = require("express");
const { default: mongoose } = require("mongoose");
const { verifySession } = require("../middleware/verifySession");
const Letter = require("../models/Letter");
const User = require("../models/User");

//CREATE LETTER
router.post("/", verifySession, async (req, res) => {
  const newLetter = new Letter({
    caption: req.body.caption,
    bodyDesc: req.body.bodyDesc,
    author: req.body.author,
    image: req.body.image,
    isAnonymous: req.body.isAnonymous,
  });
  try {
    const savedLetter = await newLetter.save();
    await User.findByIdAndUpdate(savedLetter.author, {
      $push: { letterId: savedLetter._id },
    });
    res.status(200).json(savedLetter);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE LETTER
router.put("/:letterid", async (req, res) => {
  try {
    const data = await Letter.findByIdAndUpdate(
      req.params.letterid,
      {
        $set: { caption: req.body.caption, bodyDesc: req.body.bodyDesc },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE LETTER
router.delete("/:letterid", async (req, res) => {
  try {
    const data = await Letter.findByIdAndDelete(req.params.letterid);
    await User.findByIdAndUpdate(data.author, {
      $pull: { letterId: data._id },
    });
    res.status(200).json("Data has been deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ONE LETTER
router.get("/:letterid", async (req, res) => {
  try {
    const data = await Letter.findById(req.params.letterid).populate({
      path: "author",
      select: "username fullname email",
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ALL LETTER
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qOld = req.query.old;
  const qMostLike = req.query.mostLike;
  const skip = parseInt(req.query.skip);
  try {
    let data;
    if (qNew) {
      data = await Letter.find();
      // .skip(req.query.skip)
      // .limit(1)
      // .sort({ createdAt: -1 })
      // .populate({
      //   path: "author",
      //   select: "username fullname email",
      // });
      data = await Letter.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 1, fullname: 1, email: 1 } }],
            as: "author_docs",
          },
        },
        { $addFields: { total_likes: { $size: "$likes" } } },
        { $addFields: { total_comments: { $size: "$commentId" } } },
        { $sort: { createdAt: -1, _id: 1 } },
        { $skip: skip },
        { $limit: 2 },
      ]);
    } else if (qOld) {
      // data = await Letter.find()
      //   .skip(req.query.skip)
      //   .limit(1)
      //   .sort({ createdAt: 1 })
      //   .populate({
      //     path: "author",
      //     select: "username fullname email",
      //   });
      data = await Letter.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 1, fullname: 1, email: 1 } }],
            as: "author_docs",
          },
        },
        { $addFields: { total_likes: { $size: "$likes" } } },
        { $addFields: { total_comments: { $size: "$commentId" } } },
        { $sort: { createdAt: 1, _id: 1 } },
        { $skip: skip },
        { $limit: 2 },
      ]);
    } else if (qMostLike) {
      data = await Letter.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 1, fullname: 1, email: 1 } }],
            as: "author_docs",
          },
        },
        { $addFields: { total_likes: { $size: "$likes" } } },
        { $addFields: { total_comments: { $size: "$commentId" } } },
        { $sort: { total_likes: -1, _id: 1 } },
        { $skip: skip },
        { $limit: 2 },
      ]);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//LIKES AND UNLIKES
router.put("/:letterid/like", verifySession, async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.letterid);
    if (!letter.likes.includes(req.body.userId)) {
      await letter.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("letter has been liked");
    } else {
      await letter.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("letter has been unliked");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET LIKES
router.get("/:letterid/getlike", async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.letterid);
    res.status(200).json(letter.likes.length);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;

//COUNT SINGLE LIKE
router.get("/:letterid/like", async (req, res) => {
  try {
    const like = await Letter.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.letterid) } },
      {
        $group: {
          _id: "$_id",
          totalLike: { $sum: { $size: "$likes" } },
        },
      },
    ]);
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json(error);
  }
});

//COUNT SINGLE COMMENT
router.get("/:letterid/comment", async (req, res) => {
  try {
    const comment = await Letter.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.letterid) } },
      {
        $group: {
          _id: "$_id",
          totalComment: { $sum: { $size: "$commentId" } },
        },
      },
    ]);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
});
