const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
   origin: "http://localhost:3000",
  methods: ["GET", "POST"]
 }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
    console.log("Socket.io server running on http://localhost:4000");
  });