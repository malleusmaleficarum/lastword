const User = require("../models/User");

const verifySession = async (req, res, next) => {
  if (!req.session || !req.session.user)
    return res
      .status(403)
      .json({ msg: "you should login to access this page" });
  const userSession = await User.findById(req.session.user.id);
  if (!userSession)
    return res.status(403).json({ msg: "this session no longer exist" });
  next();
};

module.exports = { verifySession };
