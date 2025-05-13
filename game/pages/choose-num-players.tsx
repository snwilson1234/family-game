'use client';
import Link from 'next/link';
import { useState } from 'react';
import MyDropdown from './components/dropdown';


export default function PlayerChoice() {
  const [players, setPlayers] = useState<number | null>(null);
  const [continueEnabled, setContinueEnabled] = useState<boolean | null>(false);

  const handlePlayerUpdate = (value: number) => {
    console.log('players updated');
    setContinueEnabled(true);
    setPlayers(value);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-20">
      <h1 className="text-5xl font-medium inline-block">How many players?</h1>
      <MyDropdown
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
          { value: '4', label: 'Four' },
          { value: '5', label: 'Five' },
          { value: '6', label: 'Six' },
        ]} 
        onSelect={handlePlayerUpdate} />
      <div className="flex flex-col items-center">
        <Link
          href={{
            pathname: '/connect-page',
            query: {
              numPlayers: `${players}`,
            }
          }}
        >
          <button  
            disabled={!continueEnabled}
            className="btn btn-primary w-lg">Continue</button>
        </Link>
      </div>
    </div>
  );
}
