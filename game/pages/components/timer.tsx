

type TimerProps = {
  timeLeft: number,
  onTimerStart: () => void,
  onTimerStop: () => void,
  onTimerReset: () => void,
};

const Timer = ({
  timeLeft,
  onTimerStart,
  onTimerStop,
  onTimerReset
}: TimerProps) => {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
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
  );

}

export default Timer;