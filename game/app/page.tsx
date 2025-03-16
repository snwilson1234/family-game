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
    if (/iphone|ipod/i.test(userAgent)) setDeviceType("iphone");
    else if (/windows|macintosh|linux|x11/i.test(userAgent)) setDeviceType("desktop");
    else setDeviceType("mobile");

    localStorage.setItem("deviceType", deviceType!);

    if (deviceType == "iphone" || deviceType == "mobile") {
      router.push("/playerJoinForm");
    }
    else {
      router.push("/adminPage");
    }
  }, []);

  return <div className="flex flex-col items-center justify-center w-full h-screen text-3xl">Loading...</div>;
}

