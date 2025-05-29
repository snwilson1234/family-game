'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Signal } from "lucide-react"; 
import { useGameContext } from "../providers/GameProvider";


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
          <div className="flex flex-col items-center w-3/4 h-4/5 bg-indigo-700 rounded-md">
            <div className="flex flex-col items-center w-full h-1/10 justify-center text-lg font-semibold">
              <p className="">Connections</p>
            </div>
            <div className="flex flex-col items-center w-3/4 h-8/10 gap-2 py-2 rounded-md shadow-lg bg-indigo-800">
              {
                Array.from({ length: numPlayers }).map((_, index) => {
                  const player = players[index];
    
                  return (
                    <div key={index} className="flex flex-row items-center px-6 gap-2 h-10 w-4/5 rounded-md bg-indigo-500">
                      {
                        (player && player["type"] == "player") ? (
                          <>
                            <Signal className="text-white"/>
                            <p>{player['name']}</p>
                          </>
                        ) : (
                          <>
                            <Loader2 className="animate-spin text-white" />
                            <p>Waiting...</p>
                          </>
                        )
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          <Link href={{ pathname: '/gameboard' }}>
            <button 
              onClick={() => {
                setGameActive(true);
                sendStartGameSignal();
              }}
              className="
              btn btn-primary w-xl
            ">Start Game</button>
          </Link>
          
          {
            <p>You are: {`${thisPlayer ? thisPlayer['name'] : ""}`}</p>
          }
      </div>
    );
  }
};

export default ConnectPage;
