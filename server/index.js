const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const cors = require("cors");
app.use(cors);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    console.log("JOIN ROOM", room);
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    console.log("send_message", data);
    // socket.emit("recieve_message", data);
    socket.to(data.room).emit("recieve_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
