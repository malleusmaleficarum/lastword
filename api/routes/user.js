const User = require("../models/User");
const Letter = require("../models/Letter");
const Comment = require("../models/Comment");
const router = require("express").Router();
const { verifyTokenAdmin } = require("../middleware/verifyJWT.js");
const { verifySession } = require("../middleware/verifySession");

//UPDATE USER
router.put("/:userid", verifySession, async (req, res) => {
  // if (req.body.password) {
  //   req.body.password = CryptoJS.AES.encrypt(
  //     req.body.password,
  //     process.env.AES_KEY
  //   ).toString();
  // }
  if (req.body.currId === req.params.userid) {
    try {
      const data = await User.findByIdAndUpdate(
        req.params.userid,
        {
          $set: {
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.username,
            image: req.body.image,
            // password: req.body.password,
          },
        },
        { new: true }
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(403).json("You only can update your Account");
  }
});

//DELETE USER
router.delete("/:userid", async (req, res) => {
  if (req.body.currId === req.params.userid) {
    try {
      const user = await User.findById(req.params.userid);
      const comment = await Comment.find({
        userId: req.params.userid,
      });
      console.log(comment);
      //pullall comment who has been posted by deleted user
      await Letter.updateMany(
        {},
        { $pullAll: { commentId: comment, likes: comment } }
      );
      //pullall comment by other user who has been posted comment in deleted letter user
      await User.updateMany({}, { $pullAll: { commentId: comment } });
      //delete all comment by deleted user
      await Comment.deleteMany({ userId: user._id });
      //delete all letter posted by deleted user
      await Letter.deleteMany({ author: user._id });
      await User.findByIdAndDelete(req.params.userid);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(403).json("You only can delete your Account");
  }
});

//GET ALL USER
router.get("/", verifySession, async (req, res) => {
  try {
    const data = await User.find().select("-password -refreshToken");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ONE USER
router.get("/:userid", async (req, res) => {
  try {
    const data = await User.findById(req.params.userid).select(
      "-password -refreshToken"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
