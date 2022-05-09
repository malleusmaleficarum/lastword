const router = require("express").Router();
const User = require("../models/User");
const Token = require("../models/Token");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { sendEmail } = require("../utils/sendEmail");
const { verifySession } = require("../middleware/verifySession");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.AES_KEY
    ).toString(),
  });
  try {
    //save user
    const savedUser = await newUser.save();
    //create token for email confirmation
    if (!savedUser) return res.sendStatus(403);
    const newToken = await new Token({
      userId: savedUser._id,
      token: require("crypto").randomBytes(32).toString("hex"),
    }).save();
    //send verification email to user
    const url = `Click on this link to verify your email: http://localhost:3000/user/${savedUser._id}/verify/${newToken.token}`;
    await sendEmail(savedUser.email, "Email Verification", url);
    const { password, refreshToken, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(400).json(err);
  }
});

//VERIFY EMAIL
router.post("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json("user does not exist");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json("invalid token");

    await User.findByIdAndUpdate(user._id, { isVerify: true });
    await Token.findByIdAndDelete(token._id);

    res.status(200).json("user has been verified");
  } catch (error) {
    console.log(error);
  }
});

//RESET PASSWORD
router.post("/resetPassword", async (req, res) => {
  try {
    //find user with email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.sendStatus(200); //even when the email is wrong, do not send 'email not found' to the front end
    //create token for reset password
    const newToken = await new Token({
      userId: user._id,
      token: require("crypto").randomBytes(32).toString("hex"),
    }).save();
    //send verification email to user
    const url = `Click on this link to reset your password: http://localhost:3000/resetPassword/?token=${newToken.token}`;
    await sendEmail(user.email, "Reset Password", url);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).json(err);
  }
});

//VERIFY RESET PASSWORD
router.post("/resetPassword/user", async (req, res) => {
  try {
    //check token
    const token = await Token.findOne({ token: req.query.token });
    if (!token) return res.status(400).json("not found");
    //check user
    const user = await User.findById(token.userId);
    if (!user) return res.status(400).json("wrong user");
    //if VALID update user
    await User.findByIdAndUpdate(
      token.userId,
      {
        $set: {
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AES_KEY
          ).toString(),
        },
      },
      { new: true }
    );
    //if VALID remove token
    await Token.deleteMany({ userId: user._id });
    res.status(200).json("password has been changed");
  } catch (error) {
    res.sendStatus(400);
  }
});

// //LOGIN WITH JWT
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     //CHECK IF USER EXIST
//     if (!user) return res.status(401).json("Wrong data");
//     const hashedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.AES_KEY
//     );
//     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//     //CHECK THE PASSWORD
//     if (originalPassword !== req.body.password)
//       return res.status(401).json({ message: "Wrong Credential" });

//     //CREATE JWT ACCESSTOKEN & REFRESHTOKEN
//     const accessToken = jwt.sign(
//       { username: user.username, email: user.email, isAdmin: user.isAdmin },
//       process.env.ACCESS_TOKEN_KEY,
//       { expiresIn: "10s" }
//     );
//     const refToken = jwt.sign(
//       { username: user.username, email: user.email, isAdmin: user.isAdmin },
//       process.env.REFRESH_TOKEN_KEY,
//       { expiresIn: "1d" }
//     );

//     //save user refreshToken in DB
//     await User.findOneAndUpdate(
//       { username: req.body.username },
//       { refreshToken: refToken }
//     );

//     const { password, refreshToken, ...others } = user._doc;
//     //send accesstoken to user and save refreshtoken to cookie (httponly)
//     res.cookie("refToken", refToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       // if using HTTPS ---> secure: true,
//     });
//     res.status(200).json({ others, accessToken });
//   } catch (error) {
//     res.status(401).json(error);
//   }
// });

//LOGIN WITH SESSION COOKIE
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    //CHECK IF USER EXIST
    if (!user) return res.status(401).json("Wrong data");
    if (!user.isVerify)
      return res.status(401).json("Please verify your account");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.AES_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    //CHECK THE PASSWORD
    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong Credential");
    const sesUser = { id: user._id, username: user.username };
    const { password, refreshToken, ...others } = user._doc;
    req.session.user = sesUser;
    res.status(200).json({ others, sesUser });
  } catch (error) {
    res.status(401).json(error);
  }
});

// //REFRESH TOKEN
// router.get("/refToken", async (req, res) => {
//   //ambil refToken dari cookies
//   const refToken = req.cookies.refToken;
//   //jika tidak ada beri error
//   if (!refToken) return res.sendStatus(401);
//   //kalau ada, bandingkan refToken di cookies dengan refToken di db user
//   const user = await User.findOne({ refreshToken: refToken });
//   //kalau token di db tidak sama dengan token di cookies
//   if (user.refreshToken !== refToken) return res.sendStatus(403);
//   //jika token nya sama, verify refresh tokennya
//   jwt.verify(refToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
//     if (err || user.username !== decoded.username) return res.status(403);
//     //setelah diverify, buat access token yang baru
//     const accessToken = jwt.sign(
//       {
//         username: decoded.username,
//         email: decoded.email,
//         isAdmin: decoded.isAdmin,
//       },
//       process.env.ACCESS_TOKEN_KEY,
//       { expiresIn: "10s" }
//     );
//     res.json({ accessToken });
//   });
// });

//LOGOUT SESSION COOKIE
router.post("/logout", verifySession, async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("sess");
    res.status(200).json("User has been logged out");
  });
});

// //LOGOUT JWT
// router.post("/logout", async (req, res) => {
//   const refToken = req.cookies.refToken;
//   if (!refToken) return res.sendStatus(204); //no content
//   //cari user di db yang punya reftoken ini
//   const user = await User.findOne({ refreshToken: refToken });

//   //kalau token di db tidak sama dengan token di cookies
//   if (user.refreshToken !== refToken) {
//     //delete cookie di sini optional, yang dibawah wajib
//     res.clearCookie("refToken", {
//       httpOnly: true,
//       sameSite: "None",
//       secure: true,
//     });
//     return res.sendStatus(204);
//   }
//   //sett refreshToken di db to null
//   await User.findByIdAndUpdate(user._id, { refreshToken: null });
//   //hapus refToken di cookie
//   res.clearCookie("refToken", {
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
//   });
//   return res.sendStatus(200);
// });

// //PASSPORT
// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000",
//     failuredLogin: "/login/failed",
//   })
// );

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successful",
//       user: req.user,
//       //cookies: req.cookies
//       //jwt
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("http://localhost:3000/");
// });

module.exports = router;
