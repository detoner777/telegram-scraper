const express = require("express");
const cors = require("cors");
const router = express.Router();

const barDataController = require("../controllers/barDataController");

const corsOptions = {
  origin:
    "http://localhost:3006" ||
    "http://localhost:4001" ||
    "https://go-together-fastov.herokuapp.com/",
  optionsSuccessStatus: 200,
};

router.get("/get-bar-chat", cors(corsOptions), barDataController.get);

module.exports = router;
