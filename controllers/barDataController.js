const path = require("path");
const fs = require("fs");

const rawdata = fs.readFileSync(
  path.resolve(__dirname, "../", "storage", "bar.json")
);
const barData = JSON.parse(rawdata);

exports.get = function (req, res) {
  res.send(barData).status(200);
};
