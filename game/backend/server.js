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

// store all connected players, including admin
let players = {};

// store "player" type players
let playerArr = [];

// store current round categories
let roundCategories = [];
let roundLetter = "";

// listen for player connections
io.on("connection", (socket) => {
  // once player is connected,
  console.log(`Player connected: ${socket.id}`);

  // listen for joinGame event
  socket.on("joinGame", (playerName, playerType) => {
    console.log("player", playerName, "joined game");
    if (playerType == "player") {
      // update player array for client usage if "player"
      playerArr.push({
        id: socket.id,
        name: playerName,
        type: playerType
      });
    }

    // update server player object with all players
    players[String(socket.id)] = {
      name: playerName,
      type: playerType,
      answers: []
    }

    // send updated player array to all clients
    io.emit("updatePlayers", playerArr); 

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
  });

  // listen for admin to start the game
  socket.on("startGame", () => {
    console.log("Admin has started the game.");
    io.emit("startGame", true);
  });

  // listen for admin to set categories
  socket.on("setCategories", (categories) => {
    console.log("received new categories", categories);
    roundCategories = categories;
    io.emit("updateCategories", roundCategories);
    io.emit("categorySelection", true);
  });

  socket.on("startRound", () => {
    console.log("Admin has started the round.");
    io.emit("roundActive", true);
  });

  socket.on("endRound", () => {
    console.log("Admin has ended the rounded.")
    io.emit("roundActive", false);
  });

  // listen for other players to request the current categories for their form labels
  socket.on("getCategories", () => {
    console.log("sending categories to players");
    socket.emit("updateCategories", roundCategories);
  });

  socket.on("setLetter", (letter) => {
    console.log("received new letter: ", letter);
    roundLetter = letter;
    io.emit("updateLetter", roundLetter);
  });

  socket.on("getLetter", () => {
    console.log("sending letter to client");
    socket.emit("updateLetter", roundLetter);
  });

  // listen for player response
  socket.on("submitAnswers", (answers) => {
    console.log("received player", players[socket.id]["name"], "answers");
    console.log("their answers were:", answers);
    players[socket.id]["answers"] = answers;
    playerArr = playerArr.map(player =>
        player.id === socket.id ? { ...player, answers: answers } : player
    );
    io.emit("updatePlayers", playerArr);
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    playerArr = playerArr.filter(player => player.id !== socket.id);
    delete players[socket.id];
    io.emit("updatePlayers", playerArr);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://192.168.1.204:3001"); // Replace with your local IP
});

