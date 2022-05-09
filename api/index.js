const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const letterRoute = require("./routes/letter");
const commentRoute = require("./routes/comment");
const userRoute = require("./routes/user");
const reportRoute = require("./routes/report");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
// const passport = require("passport");
// require("./routes/passport");

dotenv.config();

const port = 5000;

app.disable("x-powered-by");

// app.use(
//   cookieSession({
//     name: "sesi",
//     keys: ["tesdoang"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const store = new mongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "ssUr",
  expires: 1000 * 60 * 60 * 24 * 3, // 3days
});
app.use(
  session({
    name: "sess",
    secret: process.env.COOKIE_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/letter", letterRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/api/report", reportRoute);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
