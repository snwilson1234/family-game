const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// import Player from '../pages/gamestate/player';

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
let playerArr = [];

// listen for player connections
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // listen for joinGame event
  socket.on("joinGame", (playerName, playerType) => {
    console.log("player", playerName, "joined game");
    playerArr.push({// update player list
      id: socket.id,
      name: playerName,
      type: playerType
    });
    players[String(socket.id)] = {// update player list
      name: playerName,
      type: playerType
    }
    io.emit("updatePlayers", playerArr); // Send updated player array
    console.log("All players: ", players);
    console.log("All players array sent to clients: ", playerArr);
    socket.emit("confirmJoin", {playerId: socket.id});
  });

  socket.on("whoami", () => {
    console.log("received whoami request");
    socket.emit("whoami", {
      id: String(socket.id),
      name: players[socket.id]['name'],
      type: players[socket.id]['type'],
    });
  });

  socket.on("getPlayers", () => {
    console.log("received get players request");
    console.log("players:", players);
    socket.emit("updatePlayers", playerArr);
  })

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("updatePlayers", playerArr);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://192.168.1.204:3001"); // Replace with your local IP
});

