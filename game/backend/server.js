const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from different origins

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allows all clients on your network
  },
});

let players = {}; // Store connected players

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Handle player joining
  socket.on("joinGame", (playerType) => {
    players[socket.id] = playerType; // Store player type (admin/player)
    io.emit("updatePlayers", players); // Send updated player list
  });

  // Handle player actions (e.g., answering a question)
  socket.on("playerAction", (data) => {
    io.emit("updateGame", data); // Broadcast action to all players
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://192.168.1.204:3001"); // Replace with your local IP
});
