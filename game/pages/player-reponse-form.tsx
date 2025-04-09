'use client';
import { useEffect, useState } from "react";
import { useWebSocket } from "./context/GameSocketContext";
import { Socket } from "socket.io-client";
import { PlayerFormState } from "./types/formstate";
import { useRouter } from "next/router";
import { LobbyState } from "./types/lobbystate";

// need to work on state changes in game and form

const PlayerResponseForm = () => {

  const socket: Socket | null = useWebSocket();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [letter, setLetter] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [formState, setFormState] = useState<PlayerFormState>(PlayerFormState.Active);
  const [roundActive, setRoundActive] = useState<boolean>(true);

  useEffect(() => {
    if (socket) {
      socket.on("updateRoundCategories", setCategories);
      socket.on("updateRoundLetter", setLetter);
      socket.emit("getRoundCategories");
      socket.emit("getRoundLetter");
      socket.on("roundActive", setRoundActive);
    }

    return () => {
      if (socket) {
        socket.off("updateRoundCategories");
        socket.off("updateRoundLetter");
        socket.off("roundActive", setRoundActive);
      }
    }
  },[]);

  useEffect(() => {
    if (roundActive === false) {
      router.push(`player-lobby?lobbyState=${LobbyState.BetweenRound}`);
    }
  }, [roundActive])

  const submitAnswers = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("player answers:", answers);

    if (socket) {
      let newAnswers = [...answers];
      newAnswers.forEach((answer, i) => {
        console.log(`Player answer: XX${answer}XX`);
        console.log(`Player answer type: XX${typeof(answer)}XX`);
        if (answer === undefined || answer.trim() == '')
          newAnswers[i] = 'NO_ANSWER';
      });

      if (newAnswers.length < 10) {
        const pad = 10 - newAnswers.length;
        newAnswers = newAnswers.concat(Array(pad).fill('NO_ANSWER'));
      }
      console.log("player answers NOW!:", newAnswers);
      socket.emit("submitAnswers", newAnswers);
      setAnswers(newAnswers);
    }

    setFormState(PlayerFormState.Submitted);
  };

  const handleInputChange = (index: number, value: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className={`
        ${formState === PlayerFormState.Submitted ? 'visible' : 'invisible' }  absolute  
      `}>
        <h1 className="text-xl">Waiting for timer to run out...</h1>
      </div>
      <div className={`
        flex flex-col w-full h-full p-2 items-center absolute
        ${formState === PlayerFormState.Active ? 'visible' : 'invisible' }   
      `}>
        <h1 className="
          text-xl font-bold
        ">Your letter is: {letter}</h1>

        <form 
          onSubmit={submitAnswers}
          className="flex flex-col items-center w-full h-screen bg-indigo-800 rounded-md p-4">
          {
            categories.map(
              (category, index) => (
                <label key={index} className="mb-2">
                  <h1 className="text-bold text-md">{category}: </h1>
                  <input
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    className="bg-indigo-50 text-indigo-900 capitalize rounded-sm pt-1 px-2 border-b-4 border-indigo-500 focus:outline-2 focus:outline-indigo-500"
                    name={`query${index}`} 
                  />
                </label>
                )
              )
            }
          <button className="bg-indigo-400 text-white font-bold rounded-md p-2" type="submit">Submit Answers</button>
        </form>
      </div>
    </div>
  );
}
export default PlayerResponseForm;