'use client';
import { Socket } from "socket.io-client";
import { useWebSocket } from "./context/GameSocketContext"
import { useEffect, useState } from "react";
import { Player } from "./types/player";


type ResultsPageProps = {
  onContinue : () => void,
  onWinner : (winner: Player) => void,
};

const ResultsPage = ({ 
  onContinue, onWinner
} : ResultsPageProps) => {
  
  const socket: Socket | null = useWebSocket();
  const [players, setPlayers] = useState<Player[]>([]);
  const [categories, setCategories] = useState([]);
  const [focusCategoryIndex, setFocusCategoryIndex] = useState<number>(-1);
  const [rowFocusColors, setRowFocusColors] = useState<string[]>(['bg-green-800','bg-green-800','bg-green-800','bg-green-800']);

  
  useEffect(() => {
    if (socket) {
      console.log("socket on!!");
      socket.on("updatePlayers", setPlayers);
      socket.on("updateRoundCategories", setCategories);
      socket.emit("getPlayers");
      socket.emit("getRoundCategories");
    }

    return () => {
      if (socket) {
        console.log("socket off from results page!!");
        socket.off("updatePlayers");
        socket.off("updateRoundCategories");
      }
    }
  }, []);

  // useEffect()

  useEffect(() => {
    const row_highlights : string[] = [];
    const answer_counts: {[key: string]: number} = {};

    console.log("FOCUS CATEGORY INDEX:", focusCategoryIndex);

    players.forEach(( player, _ ) => {
      const answer = player.answers[focusCategoryIndex];
      answer_counts[answer] = (answer_counts[answer] || 0) + 1;
    });

    players.forEach(( player, _ ) => {
      const answer = player.answers[focusCategoryIndex];
      row_highlights.push(answer_counts[answer] > 1 ? 'bg-red-800' : 'bg-green-800');
      if (answer_counts[answer] == 1) {
        player.points += 10;
      }
      console.log(`${player.name} now has ${player.points} points.`);

      socket?.emit("updatePoints",player.id,player.points);

      // detect winner
      // TODO: change to more reasonable number when actually playing the game
      if (player.points >= 10) {
        onWinner(player);
      }

    });

    // set the row colors based on answer similarities
    setRowFocusColors(row_highlights);

  }, [focusCategoryIndex])

  return (
    <div className="flex flex-col h-full w-full items-center gap-10 p-8">
      <div className="flex flex-row gap-10">
        <h1 className="text-3xl font-bold font-white">The results are in...</h1>
        <button onClick={() => {setFocusCategoryIndex(focusCategoryIndex + 1)}} className="btn btn-primary">Next</button>
      </div>
      <div className="
        flex flex-row h-full w-full gap-10 p-8
      ">
        <div className={`
          flex flex-col w-1/${players ? players.length : 2} h-full
        `}>
          <div className={`
            flex flex-col w-full h-3/4 bg-indigo-800 gap-2 rounded-lg
            items-center justify-center p-8           
          `}>
          {
            categories?.map((category, index) => (
              <div
                key={index}
                className={`
                text-xl text-center rounded-lg w-full p-1
                ${index === focusCategoryIndex ? 'bg-gray-800' : 'bg-indigo-800'}
              `}>
                <h2>{category}:</h2>
              </div>
            ))
          } 
          </div>
        </div>
        
        {
          players?.map((player, p_idx) => (
            <div
              key={p_idx} 
              className={`
              flex flex-col w-1/${players ? players.length : 2} h-full
            `}>
              <div className="
                flex flex-col w-full h-3/4 bg-indigo-800 gap-2 rounded-lg
                items-center justify-center p-8
              ">
                {
                  player.answers?.map( (answer, index) => (
                    <div
                      key={index}
                      className={`
                      text-xl text-center rounded-lg w-3/4 p-1
                      ${index == focusCategoryIndex ? rowFocusColors[p_idx] : 'bg-indigo-700'}
                    `}>
                      <h2>{answer}</h2>
                    </div>
                    )
                  )
                }
              </div>

              <div className="
                flex flex-col items-center justify-center text-lg h-1/4
              ">
                <h1>{player.name}: {player.points}</h1>
              </div>
            </div>
          ))
        }
      </div>
      <button className="
        bg-indigo-400 w-xs h-20
        text-lg font-bold rounded-md
        hover:cursor-pointer
        hover:text-indigo-400
      " onClick={() => {
        setFocusCategoryIndex(-1);
        onContinue();
      }}>Continue</button>
    </div>
  );
}

export default ResultsPage;