import { Socket } from "socket.io-client";
import { useWebSocket } from "./socketContext"
import { useEffect, useState } from "react";
import { Player } from "./types/player";


const ResultsPage = () => {
    
    const socket: Socket = useWebSocket();
    const [players, setPlayers] = useState<Player[]>([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (socket != null) {
            console.log("socket on!!");
            socket.on("updatePlayers", setPlayers);
            socket.on("updateCategories", setCategories);
            socket.emit("getPlayers");
            socket.emit("getCategories");
        }

        return () => {
            if (socket != null) {
                console.log("socket off!!");
                socket.off("updatePlayers");
                socket.off("updateCategories");
            }
        }
    }, []);

    return (
        <div className="flex flex-col h-full w-full items-center gap-10 p-8">
            <h1 className="text-3xl font-bold font-white">The results are in...</h1>
            <div className="
                flex flex-row h-full w-full gap-10 p-8
            ">
                <div className={`
                    flex flex-col w-1/${players ? players.length : 2} h-full
                `}>
                    <div className="
                        flex flex-col w-full h-3/4 bg-indigo-800 gap-2 rounded-lg
                        items-center justify-center p-8
                    ">
                    {
                        categories?.map((category, index) => (
                            <div className="text-xl text-center rounded-lg w-full p-1">
                                <h2>{category}:</h2>
                            </div>
                        ))
                    } 
                    </div>
                </div>
                
                {
                    players?.map((player, index) => (
                        <div className={`
                            flex flex-col w-1/${players ? players.length : 2} h-full
                        `}>
                            <div className="
                                flex flex-col w-full h-3/4 bg-indigo-800 gap-2 rounded-lg
                                items-center justify-center p-8
                            ">
                                {
                                    player.answers?.map( (answer, index) => (
                                        <div className="text-xl bg-indigo-700 text-center rounded-lg w-3/4 p-1">
                                            <h2>{answer}</h2>
                                        </div>
                                        )
                                    )
                                }
                            </div>

                            <div className="
                                flex flex-col items-center justify-center text-lg h-1/4
                            ">
                                <h1>{player.name}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ResultsPage;