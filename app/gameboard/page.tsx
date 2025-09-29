'use client';
import { GameState } from "../states/gamestate";
import CategorySelection from "./category-selection/category-selection";
import ActiveRound from "./active-round/active-round";
import EndPage from "./end-page/end-page";
import { useGameContext } from "../providers/GameProvider";
import NewResultsPage from "./new-results-page/page";


const Gameboard = () => {

  const { gameState } = useGameContext();
  
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
        <ActiveRound />
      </div>
      <div className={`
        ${gameState === GameState.Results ? 'visible' : 'hidden'}
        `}
      >
        <NewResultsPage />
      </div>
      <div className={`
        ${gameState === GameState.End ? 'visible' : 'hidden'}`}
      >
        <EndPage />
      </div>
    </div>
  );
}

export default Gameboard;