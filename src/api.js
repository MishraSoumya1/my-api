const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
const sessions = require("express-session");

const app = express();
const router = express.Router();

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());
app.use(cors());

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, secure: true },
    resave: false,
  })
);

router.get("/", (req, res) => {
  res.status(200).cookie("cookieName", "I am netlify").json({
    value: Math.random().toString(),
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
