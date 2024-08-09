// const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

// const app = express();
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chat-app-git-master-marys-projects-cf8a8ef9.vercel.app" // Add your deployed app's origin here
    ],
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

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
