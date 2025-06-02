'use client';
import { useEffect, useState } from "react";
import { LobbyState } from "../states/lobbystate";
import { useGameContext } from "../providers/GameProvider";
import PlayerResponseForm from "./player-response-form/player-response-form";


const PlayerLobby = () => {

  const {
    thisPlayer,
    lobbyState
  } = useGameContext();

  const [lobbyMessage, setLobbyMessage] = useState<string>("");

  useEffect(() => {
    switch(lobbyState) {
      case LobbyState.WaitForStart:
        setLobbyMessage("Waiting for game to start...");
        break;
      case LobbyState.WaitForTimerStart:
        setLobbyMessage("Waiting for timer start...");
        break;
      case LobbyState.WaitForTimerEnd:
        setLobbyMessage("Waiting for timer to run out...");
        break;
      case LobbyState.WaitForRound:
        setLobbyMessage("Waiting for next round...");
        break;
      default:
        setLobbyMessage("err...");
        break;
    }
  }, [lobbyState]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div
        hidden={ lobbyState === LobbyState.Responding }
        className="flex flex-col items-center justify-center w-full h-screen gap-5 bg-indigo-950">
          <h1 className="text-2xl font-bold font-semibold text-center">Hello {`${thisPlayer ? thisPlayer['name'] : ""}`}!</h1>
          <h1 className="text-xl text-center">{lobbyMessage}</h1>
      </div>
      <div
        hidden={ lobbyState !== LobbyState.Responding }
        className="flex flex-col items-center justify-center w-full h-screen gap-5 bg-indigo-950">
         <PlayerResponseForm />
      </div>
    </div>
  ); 
}

export default PlayerLobby;