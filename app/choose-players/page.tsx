'use client';
import { useState } from 'react';
import PButton from '../components/PButton';
import PDropdown from '../components/PDropdown';


const ChoosePlayers = () => {
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
      <PDropdown 
        options={[
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
          { value: '4', label: 'Four' },
          { value: '5', label: 'Five' },
          { value: '6', label: 'Six' },
        ]} 
        placeholder={'Select number of players'}
        onChange={handlePlayerUpdate}
      />
      <PButton 
        label={"Continue"} 
        isLink={true}
        href={`/connect-page?numPlayers=${players}`}
        disabled={!continueEnabled}
      />
    </div>
  );
}

export default ChoosePlayers;
