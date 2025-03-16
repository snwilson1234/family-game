"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // server socket
        const newSocket = io("http://192.168.1.204:3001", {autoConnect: false});

        newSocket.connect();
        
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Clean up on unmount
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
