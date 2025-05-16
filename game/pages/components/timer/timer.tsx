'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import { PlayArrow, Pause, RestartAlt } from '@mui/icons-material';


const Timer = ({
  timeLeft,
  onTimerStart,
  onTimerStop,
  onTimerReset
}: TimerProps) => {

  const root = useRef(null);
  const scope = useRef(null);
  const [timerStarted, setTimerStarted] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!root) return;
    if (!scope) return;

    // don't do anything if the timer hasnt started yet
    if (!timerStarted) return;

    scope.current = createScope({ root }).add( (self) => {

      animate('.clockHand', {
        rotate: 360,
        ease: 'none',
        duration: timeLeft * 1000,
        loop: true
      });

    });

    return () => scope.current.revert();
    
  }, [timerStarted]);

  return (
    <div ref={root} className="
      flex flex-col items-center justify-center
      w-full h-1/2 text-2xl gap-6
    ">
      <div className="
        flex flex-col items-center justify-center
        w-60 h-60 rounded-full bg-yellow-700
      ">
        <div className="
          flex flex-col items-center
          w-50 h-50 rounded-full bg-white
        ">
          <div className="w-1 h-1/2 bg-black z-10 clockHand origin-bottom"></div>        
        </div>
      </div>
      <div className="
        flex flex-row justify-center w-full h-10
      ">
        <button
          onClick={() => {
            onTimerStop();
            // TODO: make timer clockhand animation stop in its place and able to restart from where it left off
          }} 
          className="bg-yellow-500 rounded-md"><Pause /></button>
        <button
          onClick={() => {
            onTimerStart();
            setTimerStarted(true);
          }}   
          className="bg-green-500 rounded-md"><PlayArrow /></button>
        <button
          onClick={() => {
            onTimerReset();
            setTimerStarted(false);
          }} 
          className="bg-red-800 rounded-md"><RestartAlt /></button>
      </div>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );

}

export default Timer;