// 'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2, Signal } from "lucide-react"; 

import socket from "./socket";

const ConnectPage = () => {

    const searchParams = useSearchParams();
    const numPlayers = Number(searchParams?.get("numPlayers")) || 0;
    const playerType = searchParams.get("playerType");

    const [players, setPlayers] = useState({});
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            joinGame(playerType);
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
                            Array.from({ length: numPlayers }).map((_, index) => {
                                const playerId = Object.keys(players)[index];
    
                                return (
                                    <div key={index} className="flex flex-row items-center px-6 gap-2 h-10 w-xl rounded-md bg-slate-500">
                                        {
                                            playerId ? (
                                                <>
                                                    <Signal className="h-5 w-5 text-white"/>
                                                    <p>{playerId}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                                    <p>Waiting...</p>
                                                </>
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
        </div>
    );
};

export default ConnectPage;
