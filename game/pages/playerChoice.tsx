'use client';
import Link from 'next/link';
import { useState } from 'react';


export default function PlayerChoice() {
  const [players, setPlayers] = useState<number | null>(null);
  const [continueVisible, setContinueVisible] = useState<boolean | null>(null);


  const handlePlayerUpdate = (value: number) => {
    enableContinue();
    setPlayers(value);
  };

  const getButtonClassNames = (id: number) => {
    return `font-semibold rounded-lg size-40 text-lg shadow-lg hover:cursor-pointer hover:text-slate-600 ${
      players === id ? 'text-slate-600' : 'text-slate-900'
    }`;
  };

  const enableContinue = () => {
    setContinueVisible(true);
  }

  const getContinueVisibility = () => {
    return continueVisible == true ? 'visible' : 'invisible';
  }

  return (
    <div className="flex flex-col gap-20 p-8">
      <header className="flex items-center mx-auto max-w-sm">
        <h1 className="text-5xl font-medium inline-block">Choose Players</h1>
      </header>
      <div className="flex justify-evenly">
        <button
          id="btn-2"
          onClick={() => handlePlayerUpdate(2)}
          className={`${getButtonClassNames(2)} 
            bg-slate-300 shadow-slate-300/50`}
        >Two</button>
        <button
          id="btn-3"
          onClick={() => handlePlayerUpdate(3)}
          className={`${getButtonClassNames(3)}
            bg-slate-400 shadow-slate-400/50`}
        >Three</button>
        <button
          id="btn-4"
          onClick={() => handlePlayerUpdate(4)}
          className={`${getButtonClassNames(4)}
            bg-slate-500 shadow-slate-500/50`}
          >Four</button>
      </div>
      <div
        className="
          flex flex-col items-center">
        <Link
          href={{
            pathname: '/connectPage',
            query: {
              numPlayers: `${players}`,
            }
          }}
        >
        <button
          className={`${getContinueVisibility()} 
            bg-slate-600 text-slate-900
            font-semibold rounded-lg w-md
            h-full text-lg shadow-lg 
            shadow-slate-800/50 
            hover:cursor-pointer 
            hover:text-slate-800`}
          >Continue</button>
        </Link>
      </div>
    </div>
  );
}
