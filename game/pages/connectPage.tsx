// 'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react"; 

import socket from "./socket";

const ConnectPage = () => {

    const searchParams = useSearchParams();
    const numPlayers = Number(searchParams?.get("numPlayers")) || 0;

    const [players, setPlayers] = useState({});
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.on("updatePlayers", setPlayers);
        return () => {
            socket.off("updatePlayers");
            socket.disconnect();
        };
    }, []);

    const joinGame = (type) => {
        setRole(type);
        socket.emit("joinGame", type);
    };


    return (
        <div className="
                flex flex-col gap-20 p-8
            ">
                <div className="
                    flex flex-col items-center 
                    ">
                        <h1 className="
                            text-5xl font-medium inline-block
                            ">Connect Players</h1>
                </div>
                
                <div className="
                    flex flex-col items-center
                    bg-slate-700 rounded-md
                    h-100
                ">
                    <div className="
                        flex flex-col items-center h-10
                        justify-center
                    ">
                        <p className="">Connections</p>
                    </div>
                    <div className="
                        flex flex-col items-center h-85
                        bg-slate-800 w-2xl py-6 gap-2
                        rounded-md shadow-lg
                    ">
                        {
                            Object.entries(players).map(([id, type]) => (
                                <div key={id} className="
                                    flex flex-row items-center
                                    px-6 gap-2
                                    h-10 w-xl
                                    rounded-md
                                    bg-slate-500
                                ">
                                    <Loader2 className="
                                        h-5 w-5 animate-spin text-white
                                    " />
                                    {
                                        id ? <p>{id}</p> : <p>Waiting...</p>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button 
                    className="
                        bg-slate-400
                        hover:cursor-pointer    
                    "
                    onClick={() => joinGame("player")}
                >
                    Join
                </button>
        </div>
    );
};

export default ConnectPage;
