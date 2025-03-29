'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  // use device type to determine admin/player role
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    // desktop device is admin, everyone else a player
    if (/windows|macintosh|linux|x11/i.test(userAgent)) {
      router.push("/adminPage");
    }
    else {
      router.push("/playerJoinForm");
    }
      
  }, []);

  return <div className="items-center justify-center w-full h-screen text-3xl">Loading...</div>;
}

