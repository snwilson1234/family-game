'use client';
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

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

        {/*Timer TODO: Move to a component*/}
        <div className="flex flex-col align-center justify-center w-1/4 h-full">
          <div className="h-1/4 text-center">
            <p className="text-2xl">Your Letter is:</p>
            <h1 className="text-8xl">{randomLetter}</h1>
          </div>
          <div className="
            flex flex-col align-center text-center justify-center
            w-full h-1/3 text-2xl font-bold
            rounded-lg bg-indigo-400
          ">
            <div className="h-1/4 text-5xl">{formatTime(timeLeft)}</div>
            <div className="
            flex flex-col items-center gap-2 w-full
            ">
              <button 
                className="
                bg-emerald-900 rounded-md w-1/2
                hover:cursor-pointer hover:text-indigo-300
                " 
                onClick={onTimerStart}
              >Start</button>
              <button 
                className="bg-red-900 rounded-md w-1/2
                hover:cursor-pointer hover:text-indigo-300
                " 
                onClick={onTimerStop}
              >Stop</button>
              <button 
                className="bg-blue-900 rounded-md w-1/2
                hover:cursor-pointer hover:text-indigo-300
                " 
                onClick={onTimerReset}
              >Reset</button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );

}

export default ActiveRound;