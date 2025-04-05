'use client';
import { useEffect, useState } from "react";
import { GameState } from "./gamestate/gamestate";
import { useWebSocket } from "./context/GameSocketContext";
import { Player } from "./types/player";
import ResultsPage from "./results-page";
import { Socket } from "socket.io-client";
import CategorySelection from "./category-selection";
import ActiveRound from "./active-round";


const Gameboard = () => {

  const socket: Socket | null = useWebSocket();

  const categories = [
    "Animals",
    "Movie Titles",
    "Fictional Characters",
    "Countries",
    "Types of Candy",
    "Things Found in a Kitchen",
    "Book Titles",
    "Things That Are Cold",
    "Items in a Bedroom",
    "Superheroes & Villains",
    "TV Shows",
    "Things That Fly",
    "Types of Transportation",
    "Occupations",
    "Things at a Party",
    "Musical Instruments",
    "Things You Wear",
    "Words Associated with Space",
    "Types of Drinks",
    "Things in the Ocean",
    "Fast Food Chains",
    "Items in a Toolbox",
    "Things That Make Noise",
    "Board Games",
    "Things You Find at the Beach",
    "U.S. Cities",
    "Things That Are Sticky",
    "Things You Throw Away",
    "Famous Landmarks",
    "Cartoon Characters",
    "Things with Wheels",
    "School Subjects",
    "Things You Can Cook",
    "Types of Trees",
    "Things That Use Batteries",
    "Reasons to Call 911",
    "Things People Are Afraid Of",
    "Things in a Hospital",
    "Things You Do on Vacation",
    "Items You Take Camping",
    "Famous Athletes",
    "Video Game Titles",
    "Things That Smell Bad",
    "Things That Are Expensive",
    "Things in a Park",
    "Types of Weather",
    "Things with Stripes",
    "Types of Flowers",
    "Things in a Grocery Store",
    "Things That Glow in the Dark"
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [randomLetter, setRandomLetter] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.CategorySelection);
  const [timeLeft, setTimeLeft] = useState(20); //TODO: update to 180 when done testing
  const [isRunning, setIsRunning] = useState(false);
  const [thisPlayer, setThisPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("updatePlayers", setPlayers);
      socket.on("whoami", setThisPlayer);
      socket.emit("getPlayers");
      socket.emit("whoami");
    }

    return () => {
      if (socket) {
        socket.off("whoami");
        socket.off("updatePlayers");
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      socket.emit("setCategories", selectedCategories);
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (randomLetter != "") {
      socket.emit("setLetter", randomLetter);
    }
  }, [randomLetter]);

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
    setTimeLeft(20);
  };

  /* Choose random categories for the current round. */
  const generateRandomCategories = () => {
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    setSelectedCategories(shuffled.slice(0, 10));
  };

  /* Choose random letter from the alphabet for current round. */
  const generateRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    setRandomLetter(letters[randomIndex]);
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
    setTimeLeft(20);
    setIsRunning(false);
  };
  
  return (
    <div>
      <div className={`
        ${gameState === GameState.CategorySelection ? 'visible' : 'invisible'}
        flex flex-col items-center justify-center w-full h-screen pt-10
        absolute
      `}>
        <CategorySelection 
          selectedCategories={selectedCategories} 
          randomLetter={randomLetter} 
          onGenerateCategories={generateRandomCategories} 
          onGenerateLetter={generateRandomLetter} 
          onContinue={() => setGameState(GameState.Active)} />
      </div>
      <div className={`
        ${gameState === GameState.Active ? 'visible' : 'invisible'}
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
        ${gameState === GameState.Results ? 'visible' : 'invisible'}`}
      >
        <ResultsPage onContinue={handleResultsContinue} />
        <div className="flex flex-col items-center">
        </div>
      </div>
    </div>
  );
}

export default Gameboard;