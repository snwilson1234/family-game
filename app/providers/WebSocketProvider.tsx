"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


const WebSocketContext = createContext<Socket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("State socket updated.");
    console.log("\n\n\n\nState socket id is now:", socket?.id, "full obj:", socket);
  }, [socket]);

  useEffect(() => {
    // server socket
    const newSocket = io("http://192.168.1.204:3001", {autoConnect: false});

    newSocket.connect();

    const handleConnect = () => {
      console.log("\n\n\n\nSocket connected, id:", newSocket.id, "full obj:", newSocket);
      setSocket(newSocket);
    };

    newSocket.on("connect", handleConnect);
    
    return () => {
      console.log("Socket disconnected.");
      socket.off("connect", handleConnect);
      newSocket.disconnect(); // clean up on unmount
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
