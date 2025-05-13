'use client';
import Timer from "./components/timer";
import { Player } from "./types/player";

type ActiveRoundProps = {
  players            : Player[],
  selectedCategories : string[],
  randomLetter       : string,
  timeLeft           : number,
  onTimerStart       : () => void,
  onTimerStop        : () => void,
  onTimerReset       : () => void,
};


const ActiveRound = ({
  players,
  selectedCategories,
  randomLetter,
  timeLeft,
  onTimerStart,
  onTimerStop,
  onTimerReset,
} : ActiveRoundProps) => {

  return (
    <div>
      <div className="flex flex-row justify-center items-center w-full h-screen gap-5">
        <div className="flex flex-col w-1/2">
          <h1 className="w-full text-center text-lg">Scoreboard</h1>
          <ul className="flex flex-col bg-indigo-600 w-full h-5/6 rounded-md">
          {players.map(
            (player, index) => (
              <li className="flex flex-row justify-between p-2 pl-4 pr-4 border-b-2 border-indigo-500 last:border-none" key={index}>
                <p className="flex">{player.name}</p>
                <p>{player.points}</p>
              </li>
            )
          )}
          </ul>
        </div>
        
        <div className="flex flex-col align-center justify-center w-1/4 h-full">
          <div className="h-1/4 text-center">
            <p className="text-2xl">Your Letter is:</p>
            <h1 className="text-8xl">{randomLetter}</h1>
          </div>
          <Timer timeLeft={timeLeft} onTimerStart={onTimerStart} onTimerStop={onTimerStop} onTimerReset={onTimerReset}  />
        </div>
      </div>  
    </div>
  );


}

export default ActiveRound;