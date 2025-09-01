import { useGameContext } from "@/app/providers/GameProvider";
import Timer from "./timer/timer";
import Scoreboard from "./scoreboard";
import { Card } from "primereact/card";

const ActiveRound = () => {

  const { players,
          roundLetter } = useGameContext();

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen gap-5">
      <Scoreboard 
        players={players} 
      />
      <div className="flex flex-col items-center justify-center w-1/3 h-full gap-2">
        <Card title="Your letter is:" className="text-center">
          <h1 className="text-7xl">{roundLetter}</h1>
        </Card>
        <Timer />
      </div>
    </div> 
  );


}

export default ActiveRound;