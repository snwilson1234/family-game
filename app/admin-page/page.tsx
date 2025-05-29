'use client';
import { useEffect } from "react";
import Link from "next/link";
import { useGameContext } from "../providers/GameProvider";


const AdminPage = () => {

  const {
    adminJoinGame
  } = useGameContext();

  useEffect(() => {
    adminJoinGame();
  }, [])


    return (
      <div className="flex flex-col w-full h-screen items-center justify-center gap-20">
        <h1 className="text-5xl font-medium inline-block">Welcome to Category Game!</h1>
        <Link className="flex flex-col btn btn-primary w-full items-center" href={{ pathname: '/choose-players' }}>
          <p className="text-3xl">Play</p>
        </Link>
      </div>
    );
}

export default AdminPage;