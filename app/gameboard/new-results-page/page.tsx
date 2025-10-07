'use client';

import { useEffect, useState } from "react";
import PButton from "../../components/PButton";
import { useGameContext } from "../../providers/GameProvider";
import CardGroup from "./card-group";
import { UnderlineColor } from "./answer-card";
import { GameState } from "@/app/states/gamestate";


const NewResultsPage = () => {

  const {
    players,
    gameState,
    roundCategories,
    updatePlayerPoints,
    nextRound,
    handleWinner
  } = useGameContext();

  const [currCatIdx, setCurrCatIdx] = useState<number>(0);
  const [nextBtnEnabled, setNextBtnEnabled] = useState<boolean>(false);
  const [continueVisible, setContinueVisible] = useState<boolean>(true);
  const [playerUnderlineColors, setPlayerUnderlineColors] = useState<UnderlineColor[]>([]);
  
  // listen for gamestate to change to results so we can get initial row stuff
  useEffect(() => {
    if (gameState != GameState.Results) { return; };
    
    console.log("gamestate changed to results!");
    console.log("curr cat idx:", currCatIdx);
    const row_highlights : string[] = [];
    const answer_counts: {[key: string]: number} = {};

    players.forEach(( player, _ ) => {
      if (player.answers.length < 1) { return };
      const answer = player.answers[currCatIdx];
      answer_counts[answer] = (answer_counts[answer] || 0) + 1;
    });

    players.forEach(( player, _ ) => {
      const answer = player.answers[currCatIdx];
      if (answer != 'NO_ANSWER') {
        row_highlights.push(answer_counts[answer] > 1 ? 'red' : 'green');
      }
      else {
        row_highlights.push('bg-red-800');
      }
    });

    setPlayerUnderlineColors(row_highlights);
  }, [gameState]);


  const increasePointsBy10 = (playerName: string) => {
    const player = players.find((player, ) => player.name === playerName);
    updatePlayerPoints(player!, player!.points + 10);
  };

  const decreasePointsBy10 = (playerName: string) => {
    const player = players.find((player, ) => player.name === playerName);
    updatePlayerPoints(player!, player!.points - 10);
  };

  const handleNextCategory = () => {
    const newIdx = currCatIdx + 1;

    const row_highlights: string[] = [];
    const answer_counts: { [key: string]: number } = {};

    players.forEach(player => {
      const answer = player.answers[newIdx];
      answer_counts[answer] = (answer_counts[answer] || 0) + 1;
    });

    players.forEach(player => {
      const answer = player.answers[newIdx];
      if (answer !== 'NO_ANSWER') {
        row_highlights.push(answer_counts[answer] > 1 ? 'red' : 'green');
        if (answer_counts[answer] === 1) {
          updatePlayerPoints(player, player.points + 10);
          if ((player.points + 10) >= 50) {
            handleWinner(player);
          }
        }
      } else {
        row_highlights.push('red');
      }
    });

    setPlayerUnderlineColors(row_highlights);

    if (newIdx === 9) {
      setNextBtnEnabled(true);
      setContinueVisible(false);
    }

    setCurrCatIdx(newIdx);
  };



  const handleNextRound = () => {
    // Reset the category index, enable/disable buttons, send next round signal to players.
    setCurrCatIdx(0);
    setNextBtnEnabled(false);
    setContinueVisible(true);
    setPlayerUnderlineColors([]);
    nextRound();
  };

  return (
    <div className="flex flex-col p-8 gap-8 items-center h-screen">
      <h1 className="text-6xl">{roundCategories[currCatIdx]}</h1>
      <CardGroup 
        players={players} 
        currCatIdx={currCatIdx}
        increasePointsBy10={increasePointsBy10}
        decreasePointsBy10={decreasePointsBy10}
        underlineColorArr={playerUnderlineColors}
      />
      <div className="flex flex-row gap-4 justify-center">
        <div className={`${continueVisible ? 'visible' : 'hidden'}`}><PButton label={"Continue"} onClick={handleNextCategory} /></div>
        <PButton disabled={!nextBtnEnabled} label={"Next Round"} onClick={handleNextRound} />
      </div>
    </div>
  )
};

export default NewResultsPage;