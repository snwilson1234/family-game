'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  // use device type to determine if this is the admin or player, to keep things simple.
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/windows|macintosh|linux|x11/i.test(userAgent)) {
      // desktop device is admin
      router.push("/adminPage");
    }
    else {
      // all other users are player
      router.push("/playerJoinForm");
    }
      
  }, []);

  return <div className="flex flex-col items-center justify-center w-full h-screen text-3xl">Loading...</div>;
}

