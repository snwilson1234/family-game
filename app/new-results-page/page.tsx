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
    <div className="flex flex-col p-8 gap-8 items-center h-screen">
      <h1 className="text-6xl">{"This is a sample"}</h1>
      <CardGroup numCards={3} />
      <div className="flex flex-col justify-center">
        <PButton label={"Continue"} />
      </div>
    </div>
  )
};

export default NewResultsPage;