const jwt = require("jsonwebtoken");

//verify jwt token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //kalau authheader ga ada
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  //kalau authHeader ada
  const token = authHeader.split(" ")[1];

  //decoded isinya payload ketika initial jwt
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded;
    next();
  });
};

// const verifyTokenUser = (req, res, next) => {
//   verifyToken(req, res, () => {
//     console.log(req.params.username);
//     if (req.user.username === req.params.username || req.user.isAdmin) {
//       next();
//     } else {
//       return res.status(403).json("You're not allowed to do that");
//     }
//   });
// };

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that");
    }
  });
};

module.exports = { verifyToken, verifyTokenAdmin };
