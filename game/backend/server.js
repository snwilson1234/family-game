const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


// TODO: add initialization of allCategories when admin starts game

// ─────────────────────────────
//      WebSocket App Setup
// ─────────────────────────────
// setup express app & cors headers
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

// ─────────────────────────────
//         Game Objects
// ─────────────────────────────

// Full category list.
let allCategories = ["Male First Names", "Female First Names", "Animals","Countries","Cities","Fruits","Vegetables","Types of Candy","Ice Cream Flavors","Board Games",
 "Movie Titles", "Book Titles", "TV Shows", "Musical Instruments", "Sports", "Clothing Brands", "Car Brands", "Types of Weather",
 "Occupations", "Things in a School", "Things in a Kitchen", "Things in a Garage", "Things in a Hospital", "Things at the Beach",
 "Things in the Sky", "Things in a Park", "Things That Are Sticky", "Things That Are Round",
 "Things That Smell Good", "Things That Smell Bad", "Things You Plug In", "Things You Throw Away", "Things That Use Batteries", "Things That Can Melt", "Things That Can Fly", "Things That Are Cold", "Things That Are Hot", "Types of Trees", "Types of Flowers", "Things You Shout",
 "Things You Whisper", "Types of Drinks", "Hobbies", "School Subjects", "Dog Breeds", "Cat Breeds", "Cartoon Characters", "Superheroes",
 "Villains", "Things That Are Loud", "Things That Are Quiet", "Things You Sit On",
 "Items in a Purse or Bag", "Breakfast Foods", "Lunch Foods", "Dinner Foods", "Things That Float", "Things That Sink",
 "Famous Landmarks", "Languages", "Types of Transportation", "Things You Find on a Map",
 "Card Games", "Video Game Titles", "Types of Shoes", "Things You See at a Zoo",
 "Insects", "Reptiles", "Things That Bounce", "Things That Are Sticky",
 "Things You Take Camping", "Things You Do on Vacation", "Things That Need Water",
 "Things in a Science Lab", "Things at a Carnival", "Things in a Hotel Room", "Things You Can Recycle",
 "Things You Can Build", "Types of Cheese", "Pizza Toppings", "Kinds of Soup", "Famous Athletes", "Famous Actors",
 "Famous Singers", "Fast Food Restaurants", "Things That Are Blue", "Types of Hats",
 "Words Associated with Summer", "Things That Are Sweet", "Things That Are Sour", "Types of Fish", "Things Found Under the Bed"]

// Copy of all categories for use in restarting the game. (improve later)
const allCategoriesCopy = ["Male First Names", "Female First Names", "Animals","Countries","Cities","Fruits","Vegetables","Types of Candy","Ice Cream Flavors","Board Games",
  "Movie Titles", "Book Titles", "TV Shows", "Musical Instruments", "Sports", "Clothing Brands", "Car Brands", "Types of Weather",
  "Occupations", "Things in a School", "Things in a Kitchen", "Things in a Garage", "Things in a Hospital", "Things at the Beach",
  "Things in the Sky", "Things in a Park", "Things That Are Sticky", "Things That Are Round",
  "Things That Smell Good", "Things That Smell Bad", "Things You Plug In", "Things You Throw Away", "Things That Use Batteries", "Things That Can Melt", "Things That Can Fly", "Things That Are Cold", "Things That Are Hot", "Types of Trees", "Types of Flowers", "Things You Shout",
  "Things You Whisper", "Types of Drinks", "Hobbies", "School Subjects", "Dog Breeds", "Cat Breeds", "Cartoon Characters", "Superheroes",
  "Villains", "Things That Are Loud", "Things That Are Quiet", "Things You Sit On",
  "Items in a Purse or Bag", "Breakfast Foods", "Lunch Foods", "Dinner Foods", "Things That Float", "Things That Sink",
  "Famous Landmarks", "Languages", "Types of Transportation", "Things You Find on a Map",
  "Card Games", "Video Game Titles", "Types of Shoes", "Things You See at a Zoo",
  "Insects", "Reptiles", "Things That Bounce", "Things That Are Sticky",
  "Things You Take Camping", "Things You Do on Vacation", "Things That Need Water",
  "Things in a Science Lab", "Things at a Carnival", "Things in a Hotel Room", "Things You Can Recycle",
  "Things You Can Build", "Types of Cheese", "Pizza Toppings", "Kinds of Soup", "Famous Athletes", "Famous Actors",
  "Famous Singers", "Fast Food Restaurants", "Things That Are Blue", "Types of Hats",
  "Words Associated with Summer", "Things That Are Sweet", "Things That Are Sour", "Types of Fish", "Things Found Under the Bed"]
 

// Categories used during the game.
const usedCategories = [];

// Categories for the current round.
let roundCategories = [];
let roundLetter = "";

// All letters used (alphabet, excluding Q,U,V,W,X,Y,Z)
const allLetters = "ABCDEFGHIJKLMNOPRST";

// All players currently connected, including admins.
// Used for user identification per-client.
let players = {};

// All "player" type players.
// Used for displaying player statistics (name, points, and responses) in clients.
let playerArr = [];

// ─────────────────────────────
//        Socket Events
// ─────────────────────────────

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
        type: playerType,
        points: 0,
      });
    }

    // update server player object with all players
    players[String(socket.id)] = {
      name: playerName,
      type: playerType,
      answers: [],
      points: 0
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
      points: players[socket.id]['points']
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
  socket.on("setRoundCategories", () => {
    const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
    const randomCategories = shuffled.slice(0, 10);
    // Remove from allCategories and add to usedCategories
    for (const category of randomCategories) {
      const index = allCategories.indexOf(category);
      if (index > -1) {
        allCategories.splice(index, 1); // Remove from allCategories
        usedCategories.push(category);  // Add to usedCategories
      }
    }
    roundCategories = randomCategories;
    console.log(`Next round categories (${roundCategories.length}) are: ${roundCategories}`);
    console.log(`Remaining categories (${allCategories.length}) are: ${allCategories}`);
    console.log("No more categories detected. Resetting list...")
    if (allCategories.length === 0) {
      for (let category of allCategoriesCopy) {
        allCategories.push(category);
      }
    }
    io.emit("updateRoundCategories", roundCategories);
    // TODO: add forced game over when allCategories length = 0
  });

  // listen for other players to request the current categories for their form labels
  socket.on("getRoundCategories", () => {
    console.log("sending categories to players");
    socket.emit("updateRoundCategories", roundCategories);
  });

  socket.on("setRoundLetter", (letter) => {
    roundLetter = letter;
    console.log("Round letter is: ", roundLetter);
    io.emit("updateRoundLetter", roundLetter);
  });

  socket.on("getRoundLetter", () => {
    console.log("sending letter to client");
    socket.emit("updateRoundLetter", roundLetter);
  });

  socket.on("startRound", () => {
    console.log("Admin has started the round.");
    io.emit("roundActive", true);
  });

  socket.on("endRound", () => {
    console.log("Admin has ended the rounded.");
    io.emit("roundActive", false);
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

  // listen for player points update from admin
  socket.on("updatePoints", (playerId, pointsValue) => {
    console.log("received points update");
    players[playerId]["points"] = pointsValue;
    playerArr = playerArr.map(player =>
      player.id === playerId ? { ...player, points: pointsValue } : player
    );
    io.emit("updatePlayers", playerArr);
  });

  // listen for admin to restart the game
  socket.on("restartGame", () => {
    console.log("admin has restarted the game");
    // reset the categories array
    allCategories = Array.from(allCategoriesCopy);

    // reset player points
    for (const id in players) {
      players[id].points = 10;
    };

    for (const player of playerArr) {
      player['points'] = 0;
    }

    io.emit("updatePlayers", playerArr);
    io.emit("updateCategories", allCategories);
    io.emit("startGame", false);
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    playerArr = playerArr.filter(player => player.id !== socket.id);
    delete players[socket.id];
    io.emit("updatePlayers", playerArr);
  });
});


// ─────────────────────────────
//        Start server
// ─────────────────────────────

server.listen(3001, () => {
  console.log("Server running on http://192.168.1.204:3001"); // Replace with your local IP
});

