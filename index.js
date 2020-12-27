const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const { getChat, chatHistory } = require("./chat-history");
const db = require("./utils/db");
const { checkLogin } = require("./utils/node-storage");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

//srcapeer start:
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
