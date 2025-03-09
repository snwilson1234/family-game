import { headers } from "next/headers";
import Link from "next/link";


//use device type to determine if this is the admin or player, to keep things simple.
async function getDeviceType() {
  const userAgent = (await headers()).get("user-agent") || "";

  if (/iphone|ipod/i.test(userAgent)) return "iphone";
  if (/windows|macintosh|linux|x11/i.test(userAgent)) return "desktop";
  return "mobile";
}

export default async function Home() {

  // store device type
  const deviceType = getDeviceType();

  // if deviceType is desktop, this is an admin
  // display the game-setup page.
  if (await deviceType === "desktop") {
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

