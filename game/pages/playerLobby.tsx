import { useEffect, useState } from "react";
import { useWebSocket } from "./socketContext";


const PlayerLobby = () => {
    const socket: Socket = useWebSocket();
    const [thisPlayer, setThisPlayer] = useState(null);

    useEffect(() => {
        if (socket != null) {
            socket.on("whoami", setThisPlayer);
            // console.log("turned on WHOAMI event");
            socket.emit("whoami");
        }

        return () => {
            if (socket != null) {
                socket.off("whoami", setThisPlayer);
            }
        }
    }, []);

    return <div>You are {`${thisPlayer ? thisPlayer['name'] : ""}`}</div>
}

export default PlayerLobby;