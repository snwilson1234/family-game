'use client';
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useWebSocket } from "../../context/GameSocketContext";
import { Player } from "../../interfaces/player";


type ResultsPageProps = {
  onContinue              : () => void,
  onWinner                : (winner: Player) => void,
};

const ResultsPage = ({ 
  onContinue, onWinner
} : ResultsPageProps) => {
  
  const socket: Socket | null = useWebSocket();
  const [players, setPlayers] = useState<Player[]>([]);
  const [categories, setCategories] = useState([]);
  const [focusCategoryIndex, setFocusCategoryIndex] = useState<number>(-1);
  const [rowFocusColors, setRowFocusColors] = useState<string[]>(['bg-green-800','bg-green-800','bg-green-800','bg-green-800']);
  const [continueEnabled, setContinueEnabled] = useState<boolean>(false);

  
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
      if (answer != 'NO_ANSWER') {
        row_highlights.push(answer_counts[answer] > 1 ? 'bg-red-800' : 'bg-green-800');
        if (answer_counts[answer] == 1) {
          player.points += 10;
        }
      }
      else {
        row_highlights.push('bg-red-800');
      }
      console.log(`${player.name} now has ${player.points} points.`);
      socket?.emit("updatePoints",player.id,player.points);
      // detect winner
      // TODO: change to more reasonable number when actually playing the game
      if (player.points >= 50) {
        onWinner(player);
        setFocusCategoryIndex(-1);
      }
      

    });

    if (focusCategoryIndex === 10) {
      setContinueEnabled(true);
    }

    // set the row colors based on answer similarities
    setRowFocusColors(row_highlights);

  }, [focusCategoryIndex])

  const onPlayerPointsIncrement = (player: Player) => {
    socket?.emit("updatePoints", player.id, player.points + 10);
  }
  const onPlayerPointsDecrement = (player: Player) => {
    if (player.points > 0) {
      socket?.emit("updatePoints", player.id, player.points - 10);
    }
  }

  return (
    <div className="flex flex-col w-full h-screen items-center p-4">
      <h1 className="text-xl font-bold font-white">The results are in...</h1>

      <div className="
        flex flex-row w-full h-full gap-4 justify-center p-4
      ">
        <ul className={`
          flex flex-col items-center justify-center flex-1 h-3/4
          bg-indigo-800 rounded-lg         
        `}>
        {
          categories?.map((category, index) => (
            <li
              key={index}
              className={`
                text-sm font-bold text-end w-full p-2
                border-indigo-400 border-b-2 first:border-t-2
                ${index === focusCategoryIndex ? 'bg-gray-800' : 'bg-indigo-800'}
            `}>
              <h2>{category}:</h2>
            </li>
          ))
        } 
        </ul>
        {
          players && players.length > 0 && players?.map((player, p_idx) => (
            <div
              key={p_idx} 
              className={`
              flex flex-col flex-1 h-full items-center gap-2
            `}>
              <ul className="
                flex flex-col items-center justify-center h-3/4
                bg-indigo-800 rounded-lg w-full
              ">
                {
                  player.answers?.map( (answer, index) => (
                    <li
                      key={index}
                      className={`
                        text-sm font-bold text-center w-full p-2
                        border-indigo-400 border-b-2 pl-8 pr-8 first:border-t-2
                        ${index == focusCategoryIndex ? rowFocusColors[p_idx] : 'bg-indigo-800'}
                    `}>
                      <h2>{answer}</h2>
                    </li>
                    )
                  )
                }
              </ul>
              <h1 className="w-3/5 text-center text-2xl font-bold">{player.name}</h1>

              <div className="
                flex flex-row items-center justify-center text-lg h-1/6 w-3/4
              ">
                <button
                  onClick={() => {onPlayerPointsDecrement(player)}}
                  className="btn btn-primary bg-red-800 hover:bg-green-900 w-1/5 h-6 flex flex-1 items-center justify-center">
                  <p className="m-0 p-0">-</p>
                </button>
                <h1 className="text-4xl font-bold w-3/5 text-center">{player.points}</h1>
                <button
                  onClick={() => {
                    onPlayerPointsIncrement(player);
                    if (player.points >= 50) {
                      onWinner(player);
                      setFocusCategoryIndex(-1);
                    }
                  }}
                  className="btn btn-primary bg-green-800 hover:bg-green-900 w-1/5 h-6 flex flex-1 items-center justify-center">
                  <p className="m-0 p-0">+</p>
                </button>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex flex-row items-center justify-center gap-10 h-20">
        <button
          onClick={() => {setFocusCategoryIndex(focusCategoryIndex + 1)}} 
          className="btn btn-primary"
        >
          <p>Next</p>
        </button>
        <button
          disabled={!continueEnabled}
          className="
            btn btn-primary" 
          onClick={() => {
          setFocusCategoryIndex(-1);
          onContinue();
          setContinueEnabled(false);
        }}>Continue</button>
      </div>

      
    </div>
  );
}

export default ResultsPage;