const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const { chatHistory } = require("./chat-history");
const db = require("./utils/db");
const { checkLogin } = require("./utils/node-storage");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3006",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => start(socket), 10000);

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

const start = async (socket) => {
  await checkLogin();

  let chat = await db.getChat();

  if (!chat) {
    await db.updateChat(chat);
  }

  // let timerId = setTimeout(function tick() {
  runChutHistory(chat);
  let chatBar = await db.getChatBar();
  //   timerId = setTimeout(tick, 30000);
  // }, 2000);
  socket.emit("chatBar", chatBar);
};
