'use client';

import { useState } from "react";
import PButton from "../../components/PButton";
import { useGameContext } from "../../providers/GameProvider";
import CardGroup from "./card-group";
import { Player } from "@/app/interfaces/player";


interface NewResultsPageProps {
  categories: string[];
};

const NewResultsPage = ({
  categories,
}: NewResultsPageProps) => {

  // const [currCategory, setCurrCategory] = useState<string>(categories[0]);
  // const []
  const [currCatIdx, setCurrCatIdx] = useState<number>(0);
  const [nextBtnEnabled, setNextBtnEnabled] = useState<boolean>(false);
  const [continueVisible, setContinueVisible] = useState<boolean>(true);

  console.log("next btn enabled?", nextBtnEnabled);

  const {
    players,
    roundCategories,
    updatePlayerPoints,
    nextRound
  } = useGameContext();

  const increasePointsBy10 = (playerName: string) => {
    let player = players.find((player, idx) => player.name === playerName);

    updatePlayerPoints(player!, player!.points + 10);
  };

  const decreasePointsBy10 = (playerName: string) => {
    let player = players.find((player, idx) => player.name === playerName);

    updatePlayerPoints(player!, player!.points - 10);
  };

  const handleNextCategory = () => {
    setCurrCatIdx(currCatIdx + 1);
    if (currCatIdx < 0) return;
    const row_highlights : string[] = [];
    const answer_counts: {[key: string]: number} = {};

    players.forEach(( player, _ ) => {
      const answer = player.answers[currCatIdx];
      answer_counts[answer] = (answer_counts[answer] || 0) + 1;
    });

    players.forEach(( player, _ ) => {
      const answer = player.answers[currCatIdx];
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
      updatePlayerPoints(player, player.points);
      // TODO: change to more reasonable number when actually playing the game
      if (player.points >= 50) {
        // handleWinner(player);
        setCurrCatIdx(0);
      }

    });

    if (currCatIdx == 8) {
      setNextBtnEnabled(true);
      setContinueVisible(false);
    }

    // set the row colors based on answer similarities
    // setRowFocusColors(row_highlights);
  };

  const handleNextRound = () => {
    setCurrCatIdx(0);
    setNextBtnEnabled(false);
    setContinueVisible(true);
    console.log("handling next round");
    nextRound();
  };

  return (
    <div className="flex flex-col p-8 gap-8 items-center h-screen">
      <h1 className="text-6xl">{roundCategories[currCatIdx]}</h1>
      <CardGroup 
        players={players} 
        numCards={players.length} 
        currCatIdx={currCatIdx}
        increasePointsBy10={increasePointsBy10}
        decreasePointsBy10={decreasePointsBy10} 
      />
      <div className="flex flex-row gap-4 justify-center">
        <div className={`${continueVisible ? 'visible' : 'hidden'}`}><PButton label={"Continue"} onClick={handleNextCategory} /></div>
        <PButton disabled={!nextBtnEnabled} label={"Next Round"} onClick={handleNextRound} />
      </div>
    </div>
  )
};

export default NewResultsPage;