const express = require("express");
const http = require("http");
const socketio = require('socket.io');

const connect = require('./config/database-config');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on("connection", (socket) => {
  // console.log("New connection is up...");
  // console.log(socket.id);
  // socket.on("msg_send", async (data) => {
  //   console.log(data);
  //   // const chat = await Chat.create({
  //   //   roomId: data.roomid,
  //   //   user: data.username,
  //   //   content: data.msg,
  //   // });
  //   io.emit("msg_rcvd", data);
  // });
});

app.set("view engine", "ejs");

app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomid", async (req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomid,
  }).select("content user");
  console.log(chats);
  res.render("index", {
    name: "Ashwin",
    id: req.params.roomid,
    chats: chats,
  });
});

server.listen(3000, async () => {
  console.log(`Server started on port: 3000`);
  await connect();
  console.log(`MongoDB connected`);
});
