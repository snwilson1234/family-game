'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { GameState } from "./gamestate/gamestate";
import { useWebSocket } from "./context/GameSocketContext";
import { Player } from "./types/player";
import ResultsPage from "./results-page";
import CategorySelection from "./category-selection";
import ActiveRound from "./active-round";
import EndPage from "./end-page";


const Gameboard = () => {

  // TODO: gameboard shouldn't be handling all these things. yes, it's good to have components now, but this file is getting large.

  /// REFACTOR to separate files, make timer handle time and send info back to gameboard, rather than the other way around...
  // brainstorm other ideas for making this file smaller and delegating responsibility.

  // TODO:: fixx imports!!! define a standard, or Google one. ugly rn

  const socket: Socket | null = useWebSocket();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [randomLetter, setRandomLetter] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.CategorySelection);
  const [timeLeft, setTimeLeft] = useState(10); //TODO: update to 180 when done testing
  const [isRunning, setIsRunning] = useState(false);
  const [thisPlayer, setThisPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player>();

  useEffect(() => {
    if (socket) {
      socket.on("updatePlayers", setPlayers);
      socket.on("whoami", setThisPlayer);
      socket.on("updateRoundCategories", setSelectedCategories);
      socket.on("updateRoundLetter", setRandomLetter);
      socket.emit("getPlayers");
      socket.emit("whoami");
    }

    return () => {
      if (socket) {
        socket.off("whoami");
        socket.off("updatePlayers");
        socket.off("updateRoundCategories", setSelectedCategories);
        socket.off("updateRoundLetter", setRandomLetter);
      }
    }
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // when the timer is up, select new category
  useEffect(() => {
    if (isRunning && timeLeft == 0) {
      setGameState(GameState.Results);
      socket.emit("endRound");
    }
  }, [timeLeft])

  /* Do all state updates for next round. */
  const handleResultsContinue = () => {
    setGameState(GameState.CategorySelection);
    setIsRunning(false);
    setTimeLeft(10);
  };

  /* Tell the server to choose random categories for the current round. */
  const generateRandomCategories = () => {
    socket?.emit("setRoundCategories");
  };

  /* Get random letter from the alphabet for current round. */
  const generateRandomLetter = (letter: string) => {
    socket?.emit("setRoundLetter", letter);
    setRandomLetter(letter);
  };

  /* Do state updates required for starting the timer. */
  const handleTimerStart = () => {
    setIsRunning(true);
    socket.emit("startRound");
  };

  /* Do state updates required for stopping the timer. */
  const handleTimerStop = () => {
    setIsRunning(false)
  };

  /* Do state updates required for restarting the timer. */
  const handleTimerReset = () => {
    setTimeLeft(10);
    setIsRunning(false);
  };

  const handleWinner = (winner: Player) => {
    console.log("Winner is: ", winner ? winner.name : "placeholder");
    setGameState(GameState.End);
    setWinner(winner);
  }

  const handlePlayAgain = () => {
    console.log("clicked play again");
    socket?.emit("restartGame");
    setGameState(GameState.CategorySelection);
    handleTimerReset();
  }
  
  return (
    <div>
      <div className={`
        ${gameState === GameState.CategorySelection ? 'visible' : 'hidden'}
        flex flex-col items-center justify-center w-full h-screen pt-10
      `}>
        <CategorySelection 
          selectedCategories={selectedCategories} 
          randomLetter={randomLetter} 
          onGenerateCategories={generateRandomCategories} 
          onGenerateLetter={generateRandomLetter} 
          onContinue={() => setGameState(GameState.Active)} />
      </div>
      <div className={`
        ${gameState === GameState.Active ? 'visible' : 'hidden'}
      `}>
        <ActiveRound
          players={players}
          selectedCategories={selectedCategories}
          randomLetter={randomLetter}
          timeLeft={timeLeft}
          onTimerStart={handleTimerStart}
          onTimerStop={handleTimerStop}
          onTimerReset={handleTimerReset}
        />
        
      </div>
      <div className={`
        ${gameState === GameState.Results ? 'visible' : 'hidden'}
        `}
      >
        <ResultsPage 
          onContinue={handleResultsContinue}
          onWinner={handleWinner}
        />
      </div>
      <div className={`
        ${gameState === GameState.End ? 'visible' : 'hidden'}`}
      >
        <EndPage 
          winner={winner!}
          onPlayAgain={handlePlayAgain}
        />
      </div>
      
    </div>
  );
}

export default Gameboard;