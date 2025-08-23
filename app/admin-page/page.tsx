'use client';
import { useEffect } from "react";
import { useGameContext } from "../providers/GameProvider";
import PButton from "../components/Button";


const AdminPage = () => {

  const {
    adminJoinGame
  } = useGameContext();

  useEffect(() => {
    adminJoinGame();
  }, [])


    return (
      <div className="flex flex-col w-full h-screen items-center justify-center gap-20">
        <h1 className="text-5xl font-medium inline-block">
          Welcome to Category Game!
        </h1>
        <PButton label={"Play"} isLink={true} href="/choose-players" />
      </div>
    );
}

export default AdminPage;