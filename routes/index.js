const express = require("express");
const cors = require("cors");
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:3006",
  optionsSuccessStatus: 200,
};

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/get-bar-chat", cors(corsOptions), (req, res) => {
  res.send({ response: (__dirname, "../", "storage", "bar.json") }).status(200);
});

// router.get("/get-bar-chat", cors(corsOptions), (req, res) => {
//   res
//     .sendFile(path.resolve(__dirname, "../", "storage", "bar.json"))
//     .status(200);
// });

module.exports = router;
