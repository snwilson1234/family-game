'use client';
import { useState } from "react";
import { useGameContext } from "../../providers/GameProvider";


const PlayerResponseForm = () => {

  const {
          roundCategories,
          roundLetter,
          submitAnswers
        } = useGameContext();

  const [answers, setAnswers] = useState<string[]>([]);
  const [formValid, setFormValid] = useState<boolean>(true);

  const cleanAnswers = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("ANSWERS GIVEN WERE:", answers);

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
    setAnswers([]);

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
                    value={answers[index] || ''}
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