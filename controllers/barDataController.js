const db = require("../utils/db");

const getChatBar =  () => {
  // return await db.getChatBar();
  const lol = "lol";
  return lol;
};

exports.get = function (req, res) {
  getChatBar()
  // getChatBar().then((response) => res.send(response).status(200));
};
