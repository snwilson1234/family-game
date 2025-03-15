const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

//setup express app & cors headers
const app = express();
app.use(cors());

// create http server for the express app
const server = http.createServer(app);

// create websocket server and attach to HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store connected players
let players = {};
// listen for player connections
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Handle player joining
  socket.on("joinGame", (playerType) => {
    players[socket.id] = playerType;
    io.emit("updatePlayers", players); // Send updated player list
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

