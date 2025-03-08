import React, { useEffect, useState } from "react";

export default function Game() {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod/.test(userAgent)) {
      setDeviceType("iphone");
    } else if (/windows|macintosh|linux|x11/.test(userAgent)) {
      setDeviceType("desktop");
    } else {
      setDeviceType("mobile");
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Game!</h1>
      {deviceType === "iphone" ? (
        <p>You are on an iPhone! Enjoy the mobile version of the game.</p>
      ) : deviceType === "desktop" ? (
        <p>You are on a computer! Enjoy the desktop version of the game.</p>
      ) : (
        <p>You're on a mobile device (but not an iPhone).</p>
      )}
    </div>
  );
}
