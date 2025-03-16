'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWebSocket } from "@/pages/socketContext";
import { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  // store device type
  // use device type to determine if this is the host or player, to keep things simple.
  const [deviceType, setDeviceType] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/windows|macintosh|linux|x11/i.test(userAgent)) {
      // desktop device is admin/host
      router.push("/adminPage");
    }
    else {
      // all other users are player
      router.push("/playerJoinForm");
    }
      
  }, []);

  return <div className="flex flex-col items-center justify-center w-full h-screen text-3xl">Loading...</div>;
}

