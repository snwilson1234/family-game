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
    return `${
      players === id ? 'text-indigo-200 bg-indigo-600' : 'text-indigo-50'
    }`;
  };

  const enableContinue = () => {
    setContinueVisible(true);
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
          className={`btn btn-secondary ${getButtonClassNames(2)}`}
        >Two</button>
        <button
          id="btn-3"
          onClick={() => handlePlayerUpdate(3)}
          className={`btn btn-secondary ${getButtonClassNames(3)}`}
        >Three</button>
        <button
          id="btn-4"
          onClick={() => handlePlayerUpdate(4)}
          className={`btn btn-secondary ${getButtonClassNames(4)}`}
        >Four</button>
      </div>
      <div className="flex flex-col items-center">
        <Link
          href={{
            pathname: '/connectPage',
            query: {
              numPlayers: `${players}`,
            }
          }}
        >
          <button className="btn btn-primary w-lg">Continue</button>
        </Link>
      </div>
    </div>
  );
}
