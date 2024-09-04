const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: [process.env.PUBLIC_URL, process.env.HOSTED_URL],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  // Extract the username from the handshake query
  const { username } = socket.handshake.query;
  
  // Add the user to the onlineUsers object
  onlineUsers[socket.id] = username;
  
  // Broadcast the updated list of online users to all clients
  io.emit("updateUserList", Object.values(onlineUsers));
  
  console.log(`${username} connected`);

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
    
    delete onlineUsers[socket.id];
    
    io.emit("updateUserList", Object.values(onlineUsers));
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
