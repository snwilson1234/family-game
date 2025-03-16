'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWebSocket } from "@/pages/socketContext";
import { Socket } from "socket.io-client";


export default function Home() {

  const socket: Socket = useWebSocket();
  // store device type
  // use device type to determine if this is the host or player, to keep things simple.
  const [deviceType, setDeviceType] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod/i.test(userAgent)) setDeviceType("iphone");
    else if (/windows|macintosh|linux|x11/i.test(userAgent)) setDeviceType("desktop");
    else setDeviceType("mobile");
  }, []);

  // prevent flashing page "wait until hydration to decide what to display"
  if (deviceType === null) {
    return null;
  }
  // if deviceType is desktop, this is an host
  // display the game-setup page.
  else if (deviceType === "desktop") {
    return (
      <div className="flex flex-col gap-20 p-8">
        <header className="
          flex items-center mx-auto max-w-sm
        "><h1 className="
            text-5xl font-medium inline-block
          ">Category Game</h1>
        </header>
        <div className="flex flex-col gap-5 items-center">
          <Link
              href={{
                pathname: '/playerChoice',
              }}
            >
            <button
              className="
                mx-auto flex max-w-sm items-center
                gap-x-4 rounded-xl bg-white p-6
                shadow-lg outline outline-black/5 
                dark:bg-slate-800 dark:shadow-none 
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
          </Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <Link
          href={{
            pathname: '/connectPage',
            query : {
              playerType: "player",
            }
          }}
        >
        <button
          className=" 
            bg-slate-600 text-slate-900
            font-semibold rounded-lg w-md
            h-full text-lg shadow-lg 
            shadow-slate-800/50 
            hover:cursor-pointer 
            hover:text-slate-800"
          >Join Lobby</button>
        </Link>
    );
  }
}

