'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "../providers/GameProvider";
import PButton from "../components/PButton";
import PInputText from "../components/PInputText";


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
      router.push("player-lobby");
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <form 
        autoComplete="off" 
        onSubmit={joinGame}
        className="flex flex-col items-center justify-center w-full h-screen gap-10"
      >
        <label htmlFor="playerName">Enter your name:</label>
        <PInputText 
          name={"playerName"}  
          value={playerName}
          maxLength={15}
          onChange={setPlayerName} 
        />
        <PButton label={"Join"} type="submit" />
      </form>
    </div>
  );
}

export default PlayerJoinForm;