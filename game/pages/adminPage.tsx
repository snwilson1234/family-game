'use client';
import { useEffect } from "react";
import Link from "next/link";
import { Socket } from "socket.io-client";
import { useWebSocket } from "./socketContext";


const AdminPage = () => {
  const socket: Socket | null = useWebSocket();

  useEffect(() => {
    if (socket) {
      console.log("socket not null");
      socket.emit("joinGame","admin","admin");
    }

  }, [socket])


    return (
        <div className="flex flex-col w-full h-screen gap-20 p-8">
          <header className="flex flex-col items-center w-full">
            <h1 className="text-5xl font-medium inline-block">Category Game</h1>
          </header>
          <div className="flex flex-col gap-5 items-center">
            <Link href={{ pathname: '/playerChoice' }}>
              <button className="btn btn-primary">
                <div className="text-xl font-medium">Select Players</div>
              </button>
            </Link>
          </div>
        </div>
      );
}

export default AdminPage;