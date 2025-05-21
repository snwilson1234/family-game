"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Player } from "../interfaces/player";
import { GameState } from "../states/gamestate";
import { useWebSocket } from "./WebSocketProvider";

interface GameContext {
  players: Player[],
  thisPlayer?: Player,
  roundCategories: string[],
  randomLetter: string,
  gameState: GameState,
  timeLeft: number,
  isRunning: boolean,
  winner?: Player,
  updatePlayer: () => void,
  setRoundCategories: () => void,
  setRoundLetter: (letter: string) => void,
  sendStartGameSignal: () => void,
  updatePlayerPoints: (player: Player) => void,
  onPlayerPointsIncrement: (player: Player) => void,
  onPlayerPointsDecrement: (player: Player) => void,
  setGameState: (state: GameState) => void,
  handleWinner: (winner: Player) => void,
  startTimer: () => void,
  stopTimer: () => void,
  resetTimer: () => void,
  playAgain: () => void,
  nextRound: () => void
}

const MyGameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }) => {
  const socket = useWebSocket();
  
  const [gameState, setGameState] = useState<GameState>(GameState.CategorySelection);
  const [thisPlayer, setThisPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundCategories, setSelectedCategories] = useState<string[]>([]);
  const [randomLetter, setRandomLetter] = useState<string>("");
  const [winner, setWinner] = useState<Player>();
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!socket) return;

    console.log("SOCKET CONNECTED. LISTENING FOR EVENTS..");

    socket.on("whoami", setThisPlayer);
    socket.on("updatePlayers", setPlayers);
    socket.on("updateRoundCategories", setSelectedCategories);
    socket.on("updateRoundLetter", setRandomLetter);
    socket.on("endGame", handleEndGame);

    socket.emit("getPlayers");
    socket.emit("whoami");
    socket.emit("getRoundCategories");

    return () => {
      console.log("SOCKET",thisPlayer?.name,"DISCONNECTING...");
      socket.off("whoami", setThisPlayer);
      socket.off("updatePlayers", setPlayers);
      socket.off("updateRoundCategories", setSelectedCategories);
      socket.off("updateRoundLetter", setRandomLetter);
      socket.off("endGame", handleEndGame);
    };
  }, [socket]);

  useEffect(() => {
    console.log("UPDATING PLAYERS TO:", players);
  }, [players]);

  // when the timer is up, go to results page
  useEffect(() => {
    if (isRunning && timeLeft == 0) {
      setGameState(GameState.Results);
      socket.emit("endRound");
    }
  }, [timeLeft])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    console.log("THISPLAYER IS NOW:", thisPlayer);
  }, [thisPlayer])

  /* Do state updates required for starting the timer. */
  const startTimer = () => {
    setIsRunning(true);
    socket?.emit("startRound");
  };

  const handleEndGame = (winner: Player) => {
    setWinner(winner);
    setGameState(GameState.End);
  };

  const stopTimer = () => setIsRunning(false);

  /* Do state updates required for restarting the timer. */
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(10);
  };

  const playAgain = () => {
    setGameState(GameState.CategorySelection);
    setWinner(undefined);
    resetTimer();
    socket?.emit("restartGame");
  };

  const nextRound = () => {
    setGameState(GameState.CategorySelection);
    resetTimer();
  }

  /* Get random letter from the alphabet for current round. */
  const setRoundLetter = (letter: string) => {
    socket?.emit("setRoundLetter", letter);
    setRandomLetter(letter);
  };
  
  /* Tell the server to choose random roundCategories for the current round. */
  const setRoundCategories = () => {
    console.log("socket:", socket);
    console.log("generating cat.");
    socket?.emit("setRoundCategories");
  };

  const handleWinner = (winner: Player) => {
    console.log("Winner is: ", winner ? winner.name : "placeholder");
    setGameState(GameState.End);
    setWinner(winner);
  }

  const onPlayerPointsIncrement = (player: Player) => {
    socket?.emit("updatePoints", player.id, player.points + 10);
  }
  const onPlayerPointsDecrement = (player: Player) => {
    if (player.points > 0) {
      socket?.emit("updatePoints", player.id, player.points - 10);
    }
  }
  const updatePlayerPoints = (player: Player) => {
    socket?.emit("updatePoints",player.id,player.points);
  }

  const refreshPlayers = () => {
    socket?.emit("getPlayers");
  }

  const sendStartGameSignal = () => {
    if (socket) {
      socket.emit("startGame");
    }
  }

  const updatePlayer = () => {
    socket?.emit("whoami");
  }


  return (
    <MyGameContext.Provider value={{
      players,
      thisPlayer,
      roundCategories,
      randomLetter,
      gameState,
      timeLeft,
      isRunning,
      winner,
      updatePlayer,
      setRoundCategories,
      setRoundLetter,
      sendStartGameSignal,
      updatePlayerPoints,
      onPlayerPointsIncrement,
      onPlayerPointsDecrement,
      setGameState,
      handleWinner,
      startTimer,
      stopTimer,
      resetTimer, 
      playAgain,
      nextRound
    }}>
      {children}
    </MyGameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(MyGameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export default GameProvider;
