const db = require("../utils/db");

const getChatBar = async () => {
  return await db.getChatBar();
};

exports.get = function (req, res) {
  getChatBar().then((response) => res.send(response).status(200));
};
