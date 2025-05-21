'use client';
import { GameState } from "../states/gamestate";
import ResultsPage from "./results-page/results-page";
import CategorySelection from "./category-selection/category-selection";
import ActiveRound from "./active-round/active-round";
import EndPage from "./end-page/end-page";
import { useGameContext } from "../providers/GameProvider";


const Gameboard = () => {

  // TODO: gameboard shouldn't be handling all these things. yes, it's good to have components now, but this file is getting large.

  /// REFACTOR to separate files, make timer handle time and send info back to gameboard, rather than the other way around...
  // brainstorm other ideas for making this file smaller and delegating responsibility.

  // TODO:: fixx imports!!! define a standard, or Google one. ugly rn

  const { gameState,
          playAgain,
          randomLetter,
          timeLeft,
          players,
          winner,
          startTimer,
          stopTimer,
          resetTimer,
          handleWinner } = useGameContext();

  /* Do all state updates for next round. */
  const handleResultsContinue = () => {
    playAgain();
  };
  
  return (
    <div>
      <div className={`
        ${gameState === GameState.CategorySelection ? 'visible' : 'hidden'}
        flex flex-col items-center justify-center w-full h-screen pt-10
      `}>
        <CategorySelection />
      </div>
      <div className={`
        ${gameState === GameState.Active ? 'visible' : 'hidden'}
      `}>
        <ActiveRound
          players={players}
          randomLetter={randomLetter}
          timeLeft={timeLeft}
          onTimerStart={startTimer}
          onTimerStop={stopTimer}
          onTimerReset={resetTimer}
        />
      </div>
      <div className={`
        ${gameState === GameState.Results ? 'visible' : 'hidden'}
        `}
      >
        <ResultsPage
          onContinue={handleResultsContinue}
          onWinner={handleWinner}
        />
      </div>
      <div className={`
        ${gameState === GameState.End ? 'visible' : 'hidden'}`}
      >
        <EndPage 
          winner={winner!}
          onPlayAgain={() => playAgain()}
        />
      </div>
    </div>
  );
}

export default Gameboard;