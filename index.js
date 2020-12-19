const { getChat, chatHistory } = require("./chat-history");
const db = require("./utils/db");
const { checkLogin } = require("./utils/node-storage");

const runChutHistory = async (chat) => {
  await chatHistory(chat);
};

const start = async () => {
  await checkLogin();

  let chat = await db.getChat();

  if (!chat) {
    await db.updateChat(chat);
  }

  let timerId = setTimeout(function tick() {
    runChutHistory(chat);
    timerId = setTimeout(tick, 30000);
  }, 2000);
};

start();
