import { useState } from "react";
import { useWebSocket } from "./socketContext";
import { useRouter } from "next/navigation";

const PlayerJoinForm = () => {

    const socket = useWebSocket();
    const router = useRouter();
    
    const [playerName, setPlayerName] = useState("");

    const joinGame = (event: any) => {
        event.preventDefault();
        if (socket && playerName.trim() !== "") {
            socket.emit("joinGame", playerName, "player");
            router.push("/playerLobby");
        }
    }

    return (
        <div className="
            flex flex-col w-full h-screen items-center
        ">

            <form 
                onSubmit={joinGame}
                className="flex flex-col w-full h-screen items-center">
                <label className="mb-2">
                    <h1 className="text-bold text-lg">Enter your name: </h1>
                    <input 
                        className="bg-slate-100 text-black"
                        name="playerName" 
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </label>
                
                <button 
                    className="bg-slate-400 w-1/2 text-black" 
                    type="submit"
                >Join</button>
            </form>
        </div>
    );
}

export default PlayerJoinForm;