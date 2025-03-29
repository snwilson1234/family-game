'use client';
import { useEffect, useState } from "react";
import { useWebSocket } from "./socketContext";
import { useRouter, useSearchParams } from 'next/navigation';
import { Player } from "./types/player";
import { LobbyState } from "./types/lobbystate";



const PlayerLobby = () => {
  const router = useRouter();
  const socket: Socket = useWebSocket();
  const searchParams = useSearchParams();

  const [thisPlayer, setThisPlayer] = useState<Player>();
  const [roundActive, setRoundActive] = useState<Boolean>(false);

  const initialLobbyState : LobbyState = (() => {
    const stateParam = searchParams!.get("lobbyState");
    if (stateParam && Object.values(LobbyState).includes(stateParam as LobbyState)) {
      return stateParam as LobbyState;
    }
    return LobbyState.WaitingForStart;
  })();

  const initialGameStarted : Boolean = (() => {
    const stateParam = searchParams!.get("lobbyState");
    if (stateParam && Object.values(LobbyState).includes(stateParam as LobbyState)) {
      if (stateParam === 'waiting') {
        return false;
      }
    }
    return true;
  })();

  const [gameStarted, setGameStarted] = useState<Boolean>(initialGameStarted);
  const [lobbyState, setLobbyState] = useState<LobbyState>(initialLobbyState);

  useEffect(() => {
    if (socket != null) {
      // listen for player info
      socket.on("whoami", setThisPlayer);

      // enable listening for game start
      socket.on("startGame", setGameStarted);

      // enable listening for round start
      socket.on("roundActive", setRoundActive);

      // request player info
      socket.emit("whoami");
    }

    return () => {
      if (socket != null) {
        // disable socket event listeners
        socket.off("whoami", setThisPlayer);
        socket.off("startGame");
        socket.off("roundActive", setRoundActive);
      }
    }
  }, []);

  useEffect(() => {
    if (gameStarted === true) {
      setLobbyState(LobbyState.BetweenRound);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (roundActive === true) {
      router.push("/playerResponseForm");
    }
  }, [roundActive]);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className={`
        flex flex-row justify-center items-center h-screen w-full absolute
        bg-indigo-950 ${lobbyState === LobbyState.WaitingForStart ? 'visible': 'invisible'}
      `}>
        <div className="
          flex flex-col gap-5
        ">
          <h1 className="
            text-2xl font-bold font-semibold text-center
          ">Hello {`${thisPlayer ? thisPlayer['name'] : ""}`}!</h1>
          <h1 className="
            text-xl text-center
          ">
            Waiting for Admin to start the game....
          </h1>
        </div>
      </div>
      <div className={`
        flex flex-row justify-center items-center h-screen w-full absolute
        bg-indigo-950 ${lobbyState === LobbyState.BetweenRound ? 'visible': 'invisible'}
      `}>
        <div className="
          flex flex-col gap-5
        ">
          <h1 className="
            text-2xl font-bold font-semibold text-center
          ">Hello {`${thisPlayer ? thisPlayer['name'] : ""}`}!</h1>
          <h1 className="
            text-xl text-center
          ">
            Waiting for next round....
          </h1>
        </div>
      </div>
    </div>
  ); 
}

export default PlayerLobby;