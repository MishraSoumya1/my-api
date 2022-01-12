import express from "express";
import https from "https";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const key = fs.readFileSync(__dirname + "/cert/key.pem");
const cert = fs.readFileSync(__dirname + "/cert/cert.pem");

const app = express();
const port = process.env.PORT;

const server = https.createServer({ key: key, cert: cert }, app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.use(cookieParser());
app.use(cors());
// handle cookie middleware
app.use((req, res, next) => {
  const cookies = req.cookies;
  if (cookies) {
    //     res.cookie("cookieName", "my-js-123", {
    //       expires: new Date(Date.now() + 900000),
    //       httpOnly: true,
    //       //   sameSite: "",
    //       //   secure: true,
    //     });
    console.log("cookie exists", JSON.stringify(cookies));
  } else {
    console.log("cookie exists", JSON.stringify(cookies));
  }
  next();
});

app.get("/", (req, res) => {
  res
    .status(200)
    .cookie("cookieName", "cookieValue", { sameSite: "strict", secure: true })
    .json({
      value: Math.random().toString(),
    });
});

server.listen(port, () => {
  console.log(
    `Your ${process.env.ENVIRONMENT} server is started at port ${port}`
  );
});
