'use client';
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {

  const router = useRouter()

  function handleClick() {
    router.push('/playerChoice');
  }

  return (
    <div className="flex flex-col gap-20 p-8">
      <header className="
        flex items-center mx-auto max-w-sm
      "><h1 className="
          text-5xl font-medium inline-block
        ">Category Game</h1>
      </header>
      <div className="flex flex-col gap-5 items-center">
        <button onClick={handleClick}
        className="
          mx-auto flex max-w-sm items-center
          gap-x-4 rounded-xl bg-white p-6
          shadow-lg outline outline-black/5 
          dark:bg-fuchsia-950 dark:shadow-none 
          dark:-outline-offset-1 dark:outline-white/10
          hover:cursor-pointer
        ">
          <div>
            <div className="
              text-xl font-medium text-black 
              dark:text-white
            ">Select Players</div>
          </div>
        </button>
      </div>
    </div>
  );
}

