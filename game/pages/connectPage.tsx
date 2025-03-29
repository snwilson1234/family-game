'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Signal } from "lucide-react"; 
import { Socket } from "socket.io-client";
import { useWebSocket } from "./socketContext";
import { Player } from "./types/player";


const ConnectPage = () => {
  const socket: Socket = useWebSocket();

  const searchParams = useSearchParams();
  const numPlayers = Number(searchParams?.get("numPlayers")) || 0;

  const [players, setPlayers] = useState<Player[]>([]);
  const [adminUser, setAdminUser] = useState<Player>();
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (socket != null) {
      socket.on("updatePlayers", setPlayers);
      socket.on("whoami", setAdminUser);
      socket.emit("getPlayers");
      socket.emit("whoami");
    }

    return () => {
      if (socket != null) {
        socket.off("updatePlayers");
        socket.off("whoami", setAdminUser);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Updated players list:", players);
  }, [players]);

  useEffect(() => {
    console.log("Updated player:", adminUser);
  }, [adminUser]);

  const sendStartGameSignal = () => {
    if (socket != null) {
      socket.emit("startGame");
    }
  }
  

  if (gameActive) {
    return (
      <div></div>
    );
  }
  else {
    return (
      <div className="
          flex flex-col gap-20 p-8
          items-center w-full
        ">
          <div className="
            flex flex-col items-center
            w-full
            ">
              <h1 className="
                text-5xl font-medium inline-block
                ">Connect Players</h1>
          </div>
          
          <div className="
            flex flex-col items-center
            bg-indigo-700 rounded-md
            h-100 w-3/4
          ">
            <div className="
              flex flex-col items-center h-10
              justify-center text-lg font-semibold
            ">
              <p className="">Connections</p>
            </div>
            <div className="
              flex flex-col items-center h-85 w-4/5
              bg-indigo-800 py-6 gap-2
              rounded-md shadow-lg
            ">
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
          
          <Link href={{
            pathname: '/gameboard',
          }}>
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
            <p>You are: {`${adminUser ? adminUser['name'] : ""}`}</p>
          }
      </div>
    );
  }
};

export default ConnectPage;
