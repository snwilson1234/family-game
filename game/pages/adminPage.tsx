import Link from "next/link";
import { useEffect } from "react";
import { useWebSocket } from "./socketContext";


const AdminPage = () => {

  const socket: Socket = useWebSocket();

  useEffect(() => {
    if (socket != null) {
      console.log("socket not null");
      socket.emit("joinGame","admin","admin");
    }

  }, [socket])


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
                  btn btn-primary
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

export default AdminPage;