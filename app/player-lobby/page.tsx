'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Socket } from "socket.io-client";
import { useWebSocket } from "../providers/WebSocketProvider";
import { LobbyState } from "../states/lobbystate";
import { useGameContext } from "../providers/GameProvider";


const PlayerLobby = () => {

  const {
    roundActive,
    thisPlayer,
    gameStarted
  } = useGameContext();

  const router = useRouter();
  const socket: Socket | null = useWebSocket();
  const searchParams = useSearchParams();

  const initialLobbyState : LobbyState = (() => {
    const stateParam = searchParams!.get("lobbyState");
    if (stateParam && Object.values(LobbyState).includes(stateParam as LobbyState)) {
      return stateParam as LobbyState;
    }
    return LobbyState.WaitingForStart;
  })();

  const [lobbyState, setLobbyState] = useState<LobbyState>(initialLobbyState);

  useEffect(() => {
    if (gameStarted === true) {
      setLobbyState(LobbyState.BetweenRound);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (roundActive === true) {
      router.push("/player-response-form");
    }
  }, [roundActive]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div 
        hidden={lobbyState === LobbyState.WaitingForStart}
        className="flex flex-col items-center justify-center w-full h-screen gap-5 bg-indigo-950">
          <h1 className="text-2xl font-bold font-semibold text-center">Hello {`${thisPlayer ? thisPlayer['name'] : ""}`}!</h1>
          <h1 className="text-xl text-center">Waiting for Admin to start the game....</h1>
      </div>
      <div 
        hidden={lobbyState === LobbyState.BetweenRound}
        className="flex flex-col gap-5 justify-center items-center h-screen w-full bg-indigo-950">
        <h1 className="text-2xl font-bold font-semibold text-center">Hello {`${thisPlayer ? thisPlayer['name'] : ""}`}!</h1>
        <h1 className="text-xl text-center">Waiting for next round....</h1>
      </div>
    </div>
  ); 
}

export default PlayerLobby;