// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: ["https://chat-app-kappa-swart.vercel.app"], 
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   },
// });

// app.use(cors({
//   origin: ["https://chat-app-kappa-swart.vercel.app"], 
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true,
// }));


// io.on('connection', (socket) => {
//   console.log('New client connected');
  
//   socket.on('sendMessage', (message) => {
//     io.emit('receiveMessage', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });


// // module.exports = (req, res) => {
// //   server(req, res);
// // };
// server.listen(4000, () => {
//     console.log("Socket.io server running on http://localhost:4000");
//   });

// server.js
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("Socket.io server running on http://localhost:4000");
});
