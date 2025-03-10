'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2, Signal } from "lucide-react"; 

import socket from "./socket";
import Link from "next/link";

const ConnectPage = () => {

    const searchParams = useSearchParams();
    const numPlayers = Number(searchParams?.get("numPlayers")) || 0;
    const playerType = searchParams.get("playerType");

    const [players, setPlayers] = useState({});
    const [role, setRole] = useState("");
    const [gameActive, setGameActive] = useState(false);

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

    useEffect(() => {
        console.log("Updated players list:", players);
    }, [players]);
    

    const joinGame = (type) => {
        setRole(type);
        socket.emit("joinGame", type);
    };

    if (gameActive) {
        return (
            <div></div>
        );
    }
    else {
        return (
            <div className="
                    flex flex-col gap-20 p-8
                    items-center w-full
                ">
                    <div className="
                        flex flex-col items-center
                        w-full
                        ">
                            <h1 className="
                                text-5xl font-medium inline-block
                                ">Connect Players</h1>
                    </div>
                    
                    <div className="
                        flex flex-col items-center
                        bg-slate-700 rounded-md
                        h-100 w-3/4
                    ">
                        <div className="
                            flex flex-col items-center h-10
                            justify-center
                        ">
                            <p className="">Connections</p>
                        </div>
                        <div className="
                            flex flex-col items-center h-85 w-4/5
                            bg-slate-800 py-6 gap-2
                            rounded-md shadow-lg
                        ">
                            {
                                Array.from({ length: numPlayers }).map((_, index) => {
                                    const playerId = Object.keys(players)[index];
        
                                    return (
                                        <div key={index} className="flex flex-row items-center px-6 gap-2 h-10 w-4/5 rounded-md bg-slate-500">
                                            {
                                                playerId ? (
                                                    <>
                                                        <Signal className="text-white"/>
                                                        <p>{playerId}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Loader2 className="animate-spin text-white" />
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
                    
                    {/* <Link href={{
                        pathname: '/gameboard',
                    }}> */}
                        <button 
                            onClick={() => setGameActive(true)}
                            className="
                            bg-slate-400
                            w-xs h-20
                            text-lg font-bold
                            rounded-md
                            hover:cursor-pointer
                            hover:text-slate-400
                        ">Start Game</button>
                    {/* </Link> */}
                    
                    {
                        <p>You are player: test</p>
                    }
            </div>
        );
    }
};

export default ConnectPage;
