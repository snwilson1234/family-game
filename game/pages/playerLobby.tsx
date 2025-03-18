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

    return <div>You are {`${thisPlayer ? thisPlayer['name'] : ""}`}</div>
}

export default PlayerLobby;