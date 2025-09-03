'use client';

import PButton from "../components/PButton";
import { useGameContext } from "../providers/GameProvider";
import AnswerCard from "./answer-card";
import CardGroup from "./card-group";


const NewResultsPage = () => {

  const {
    players,
    roundCategories
  } = useGameContext();
  return (
    <div className="flex flex-col p-8 items-center h-screen">
      <h1 className="text-6xl h-1/5">{roundCategories[3]}</h1>
      <CardGroup numCards={8} />
      <div className="flex flex-col justify-center h-1/5">
        <PButton label={"Continue"} />
      </div>
    </div>
  )
};

export default NewResultsPage;