'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlayerFormState } from "../states/formstate";
import { LobbyState } from "../states/lobbystate";
import { useGameContext } from "../providers/GameProvider";


const PlayerResponseForm = () => {

  const {
          roundCategories,
          roundLetter,
          roundActive,
          submitAnswers
        } = useGameContext();

  // TODO: need to work on state changes in game and form

  const router = useRouter();

  // const [roundCategories, setRoundCategories] = useState([]);
  // const [letter, setLetter] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [formState, setFormState] = useState<PlayerFormState>(PlayerFormState.Active);
  const [formValid, setFormValid] = useState<boolean>(true);

  useEffect(() => {
    if (roundActive === false) {
      router.push(`player-lobby?lobbyState=${LobbyState.BetweenRound}`);
    }
  }, [roundActive])

  const cleanAnswers = (event: React.FormEvent) => {
    event.preventDefault()

    // TODO: improve this code
    let newAnswers = [...answers];
    let currFormValid = true;

    // check starting letter, if not the correct letter, error
    answers.forEach((answer, i) => {
      if (answer != undefined) {
        answer = answer.trim();
      }
      if ( answer != undefined && answer.length > 0 && answer[0].toUpperCase() != roundLetter ) {
        currFormValid = false;
      }
    })

    if (!currFormValid) {
      console.log("form not valid! Exiting...");
      console.log("formValid:", formValid);
      setFormValid(false);
      return;
    }

    setFormValid(true);

    // allow for blank answers by filling in NO_ANSWER constant
    newAnswers.forEach((answer, i) => {
      if (answer === undefined || answer.trim() == '')
        newAnswers[i] = 'NO_ANSWER';
    });

    if (newAnswers.length < 10) {
      const pad = 10 - newAnswers.length;
      newAnswers = newAnswers.concat(Array(pad).fill('NO_ANSWER'));
    }
    submitAnswers(newAnswers);
    setAnswers(newAnswers);

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
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div 
        hidden={!(formState === PlayerFormState.Submitted)}>
        <h1 className="text-xl">Waiting for timer to run out...</h1>
      </div>
      <div 
        hidden={!(formState === PlayerFormState.Active)}
      className="flex flex-col items-center w-full h-full p-2">
        <h1 className="
          text-xl font-bold
        ">Your letter is: {roundLetter}</h1>
        <div className={`
            text-red-500 font-bold
            ${formValid ? 'invisible' : 'visible' }   
          `}>Answers must start with the letter above.</div>

        <form 
          onSubmit={cleanAnswers}
          className="flex flex-col items-center w-full h-screen bg-indigo-800 rounded-md p-4">
          {
            roundCategories.map(
              (category, index) => (
                <label key={index} className="mb-2">
                  <h1 className="text-bold text-md">{category}: </h1>
                  <input
                    maxLength={25}
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