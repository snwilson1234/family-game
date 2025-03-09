import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.204:3001");

export default function Home() {
  const [players, setPlayers] = useState({});
  const [role, setRole] = useState("");

  useEffect(() => {
    socket.on("updatePlayers", (players) => setPlayers(players));
    return () => socket.off("updatePlayers");
  }, []);

  const joinGame = (type) => {
    setRole(type);
    socket.emit("joinGame", type);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      {role ? (
        <p>You joined as {role}</p>
      ) : (
        <>
          <button onClick={() => joinGame("admin")}>Join as Admin</button>
          <button onClick={() => joinGame("player")}>Join as Player</button>
        </>
      )}
      <h2>Connected Players:</h2>
      <ul>
        {Object.entries(players).map(([id, type]) => (
          <li key={id}>{id} - {type}</li>
        ))}
      </ul>
    </div>
  );
}
