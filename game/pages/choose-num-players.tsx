'use client';
import Link from 'next/link';
import { useState } from 'react';
import MyDropdown from './components/dropdown';


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
          { value: '7', label: 'Seven' }
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
          <button className="btn btn-primary w-lg">Continue</button>
        </Link>
      </div>
    </div>
  );
}
