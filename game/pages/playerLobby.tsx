import { useEffect, useState } from "react";
import { useWebSocket } from "./socketContext";
import { useRouter } from 'next/navigation';
import { Player } from "./types/player";



const PlayerLobby = () => {
    const router = useRouter();
    const socket: Socket = useWebSocket();
    const [thisPlayer, setThisPlayer] = useState<Player>();
    const [gameStarted, setGameStarted] = useState<Boolean>(false);

    useEffect(() => {
        if (socket != null) {
            // listen for player info
            socket.on("whoami", setThisPlayer);

            // enable listening for game start
            socket.on("startGame", setGameStarted);

            // request player info
            socket.emit("whoami");
        }

        return () => {
            if (socket != null) {
                // disable socket event listeners
                socket.off("whoami", setThisPlayer);
                socket.off("startGame");
            }
        }
    }, []);

    useEffect(() => {
        if (gameStarted === true) {
            router.push("/playerResponseForm");
        }
    }, [gameStarted]);

    return (
        <div className="
            flex flex-row justify-center items-center h-screen w-full
            bg-indigo-950
        ">
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
    ); 
}

export default PlayerLobby;