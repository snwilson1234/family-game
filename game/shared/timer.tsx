import { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="
        flex flex-col w-1/4 h-1/4 gap-2 p-4
        text-center text-2xl font-bold
        rounded-lg bg-slate-400
    ">
      <div>{formatTime(timeLeft)}</div>
      <div className="
        flex flex-col items-center gap-2 w-full
      ">
        <button 
          className="
            bg-emerald-900 text-white rounded-md
            w-1/2
            hover:cursor-pointer
            hover:text-slate-300
          " 
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button 
          className="
            bg-red-900 text-white rounded-md
            w-1/2
            hover:cursor-pointer
            hover:text-slate-300
          " 
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
        <button 
          className="
            bg-blue-900 text-white rounded-md
            w-1/2
            hover:cursor-pointer
            hover:text-slate-300
          " 
          onClick={() => {
            setTimeLeft(180);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
