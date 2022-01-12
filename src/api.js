const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(cors());

router.get("/", (req, res) => {
  res.status(200).cookie("cookieName", "I am netlify").json({
    value: Math.random().toString(),
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
