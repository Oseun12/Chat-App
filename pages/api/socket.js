// // pages/api/socket.js
// import { Server } from "socket.io";
// import { createServer } from "http";

// let io;

// export default function handler(req, res) {
//   if (!res.socket.server.io) {
//     console.log("Setting up Socket.io...");
//     const httpServer = createServer((req, res) => res.end());
//     io = new Server(httpServer, {
//       cors: {
//         origin: ["https://chat-app-kappa-swart.vercel.app"],
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type"],
//         credentials: true,
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("New client connected");

//       socket.on("sendMessage", (message) => {
//         io.emit("receiveMessage", message);
//       });

//       socket.on("disconnect", () => {
//         console.log("Client disconnected");
//       });
//     });

//     res.socket.server.io = io;
//   }
//   res.end();
// }
