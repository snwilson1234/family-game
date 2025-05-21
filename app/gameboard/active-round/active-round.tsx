import Timer from "./timer/timer";


const ActiveRound = ({
  players,
  randomLetter,
  timeLeft,
  onTimerStart,
  onTimerStop,
  onTimerReset,
} : ActiveRoundProps) => {

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen gap-5 p-8">
      <div className="flex flex-col items-center justify-center w-1/4 h-full gap-2">
        <ul className="flex flex-col w-full h-full bg-indigo-600 rounded-md">
          <li className="text-3xl w-full text-center border-b-4 border-indigo-500 pb-2 pt-2">Scoreboard</li>
          {players.map(
            (player, index) => (
              <li className="flex flex-row justify-between p-2 pl-4 pr-4 border-b-2 border-indigo-500" key={index}>
                <p className="text-xl">{player.name}</p>
                <p className="text-xl">{player.points}</p>
              </li>
            )
          )}
        </ul>
      </div>
      
      <div className="flex flex-col items-center justify-center w-1/4 h-full gap-2">
        <div className="flex flex-col items-center justify-center w-full h-1/2 text-center bg-indigo-500 rounded-md">
          <p className="text-2xl">Your Letter is:</p>
          <h1 className="text-8xl">{randomLetter}</h1>
        </div>
        <Timer timeLeft={timeLeft} onTimerStart={onTimerStart} onTimerStop={onTimerStop} onTimerReset={onTimerReset}  />
      </div>
    </div> 
  );


}

export default ActiveRound;