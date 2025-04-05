import { Player } from "./types/player";


const ActiveRound = (
  {
    players,
    selectedCategories,
    randomLetter,
    timeLeft,
    onTimerStart,
    onTimerStop,
    onTimerReset,

  } :
  {
    players: Player[],
    selectedCategories: string[],
    randomLetter: string,
    timeLeft: number,
    onTimerStart: any,
    onTimerStop: any,
    onTimerReset: any,
  }
) => {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="flex flex-col justify-between w-full h-screen gap-2 z-0 absolute">
        <div className="flex flex-row justify-between w-full pt-2">
          <h1 className="text-lg text-left pl-8 w-1/2">
          {`
            ${players.length >= 1 ? players[0]['name'] : ""}:
            ${players.length >= 1 ? players[0]['points'] : ""}
          `}
          </h1>
          <h1 className="text-lg text-right pr-8 w-1/2">
          {`
            ${players.length >= 2 ? players[1]['name'] : ""}:
            ${players.length >= 2 ? players[1]['points'] : ""}
          `}
          </h1>
        </div>
        
        <div className="flex flex-row justify-between w-full pb-3">
          <h1 className="text-lg text-left pl-8 w-1/2">{players.length >= 3 ? players[2]['name'] : ""}</h1>
          <h1 className="text-lg text-right pr-8 w-1/2">{players.length >= 4 ? players[3]['name'] : ""}</h1>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full h-screen gap-5 z-10 absolute">
        <ul className="flex flex-col items-center gap-1 py-5 bg-indigo-600 w-1/4 h-3/5 rounded-md">
        {
          selectedCategories.map(
          (category, index) => (
            <li className="
            bg-indigo-500 w-4/5
            rounded-md p-2 h-1/10
            text-lg
            " key={index}>
            {category}
            </li>
          )
          )  
        }
        </ul>


        {/*Timer*/}
        <div className="flex flex-col w-1/4 h-full align-center justify-center">
          <div className="h-1/4 text-center">
            <p className="text-2xl">Your Letter is:</p>
            <h1 className="text-9xl">{randomLetter}</h1>
          </div>
          <div className="
            flex flex-col w-full h-1/3 align-center
            text-center justify-center text-2xl font-bold
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