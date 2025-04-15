'use client';
import { useState } from "react";
import { useWebSocket } from "./context/GameSocketContext";
import { useRouter } from "next/navigation";
import { LobbyState } from "./types/lobbystate";
import { Socket } from "socket.io-client";


const PlayerJoinForm = () => {

  const socket: Socket | null = useWebSocket();
  const router = useRouter();
  
  const [playerName, setPlayerName] = useState("");

  const joinGame = (event: any) => {
    event.preventDefault();
    if (socket && playerName.trim() !== "") {
      socket.emit("joinGame", playerName, "player");
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