// const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

// const app = express();
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-ai1v8q0ih-marys-projects-cf8a8ef9.vercel.app",
      "https://chat-4d6bfrukk-marys-projects-cf8a8ef9.vercel.app",
      "https://chat-app-two-black.vercel.app",
      "https://chat-g5c2bbgo3-marys-projects-cf8a8ef9.vercel.app", // Add your URL
      "https://chat-a72mb5ic8-marys-projects-cf8a8ef9.vercel.app", // Add this URL if needed
      "http://localhost:3000",
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
