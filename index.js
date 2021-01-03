const express = require("express");
const http = require("http");
const path = require("path");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const { chatHistory } = require("./chat-history");
const db = require("./utils/db");
const { checkLogin } = require("./utils/node-storage");

const app = express();
app.use(index);
app.use(express.static(path.join(__dirname, "client", "build")));

const server = http.createServer(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3006" || "http://localhost:4001",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => startScraper(socket), 10000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

//srcapeer start:
const runChutHistory = async (chat) => {
  await chatHistory(chat);
};

const startScraper = async (socket) => {
  await checkLogin();

  const chat = await db.getChat();

  if (!chat) {
    await db.updateChat(chat);
  }

  runChutHistory(chat);
  const chatBar = await db.getChatBar();
  socket.emit("chatBar", chatBar);
};
