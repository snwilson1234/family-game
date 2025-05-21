'use client';
import { useEffect } from "react";
import Link from "next/link";
import { Socket } from "socket.io-client";
import { useWebSocket } from "../providers/WebSocketProvider";


const AdminPage = () => {
  const socket: Socket | null = useWebSocket();

  useEffect(() => {
    if (socket) {
      console.log("socket not null");
      socket.emit("joinGame","admin","admin");
    }

  }, [socket])


    return (
      <div className="flex flex-col w-full h-screen items-center justify-center gap-20">
        <h1 className="text-5xl font-medium inline-block">Welcome to Category Game!</h1>
        <Link className="flex flex-col w-full items-center" href={{ pathname: '/choose-players' }}>
          <button className="btn btn-primary w-1/2">
            <p className="text-3xl">Play</p>
          </button>
        </Link>
      </div>
    );
}

export default AdminPage;