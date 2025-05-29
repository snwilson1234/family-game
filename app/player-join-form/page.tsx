'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LobbyState } from "../states/lobbystate";
import { useGameContext } from "../providers/GameProvider";


const PlayerJoinForm = () => {

  const {
    playerJoinGame
  } = useGameContext();

  const router = useRouter();
  
  const [playerName, setPlayerName] = useState("");

  const joinGame = (event: any) => {
    event.preventDefault();
    if (playerName.trim() !== "") {
      playerJoinGame(playerName);
      router.push(`player-lobby?lobbyState=${LobbyState.WaitingForStart}`);
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <form 
        autoComplete="off" 
        onSubmit={joinGame}
        className="flex flex-col items-center justify-center w-full h-screen gap-10">
        <label className="mb-2">
          <h1 className="text-bold text-lg">Enter your name: </h1>
          <input
            maxLength={15} 
            className="bg-indigo-50 text-indigo-900 capitalize rounded-sm pt-2 px-2 border-b-4 border-indigo-500 focus:outline-2 focus:outline-indigo-500"
            name="playerName" 
            value={playerName}
            onChange={(e) => {
              const formattedName = e.target.value
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase()); //capitalize first letter of each word
              setPlayerName(formattedName);
            }}
          />
        </label>
        
        <button 
          className="btn btn-primary w-xs" 
          type="submit"
        >Join</button>
      </form>
    </div>
  );
}

export default PlayerJoinForm;