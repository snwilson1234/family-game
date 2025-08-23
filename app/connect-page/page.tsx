'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGameContext } from "../providers/GameProvider";
import PlayerTable from "./PlayerTable";
import PButton from "../components/Button";


const ConnectPage = () => {

  const {
    players,
    thisPlayer,
    updatePlayer,
    sendStartGameSignal
  } = useGameContext();

  const searchParams = useSearchParams();
  const numPlayers = Number(searchParams?.get("numPlayers")) || 0;

  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    updatePlayer();
  }, []);
  
  if (gameActive) {
    return (
      <div></div>
    );
  }
  else {
    return (
      <div className="flex flex-col items-center w-full h-screen gap-20 p-8">
        <div className="flex flex-col items-center w-full h-1/5">
          <h1 className="text-5xl font-medium inline-block">Connect Players</h1>
        </div>
        <PlayerTable 
          players={players} 
          numPlayers={numPlayers}
        />
        <PButton 
          label={"Start Game"} 
          isLink={true} 
          href="/gameboard"
          onClick={() => {
            setGameActive(true);
            sendStartGameSignal();
          }}
        />
        {
          <p>You are: {`${thisPlayer ? thisPlayer['name'] : ""}`}</p>
        }
      </div>
    );
  }
};

export default ConnectPage;
