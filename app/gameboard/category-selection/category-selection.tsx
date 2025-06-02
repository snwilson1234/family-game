import { Canvas } from '@react-three/fiber';
import LetterDie from './letterdie/letterdie';
import { useGameContext } from '@/app/providers/GameProvider';
import { GameState } from '@/app/states/gamestate';


const CategorySelection = () => {

  const { roundCategories,
          roundLetter,
          setGameState,
          setRoundCategories,
          setRoundLetter } = useGameContext();
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <div className="flex flex-row items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
          <h1 className="text-3xl font-medium h-1/7">Press the button for categories!</h1>
          <ul className="flex flex-col items-center w-3/4 h-5/7 gap-1 py-1 bg-indigo-600 rounded-md text-xl shadow-lg">
          {
            roundCategories.map(
              (category, index) => (
                <li className="
                  bg-indigo-500 w-3/4
                  rounded-md p-1 h-1/10
                  shadow-lg text-sm
                " key={index}>
                  {category}
                </li>
              )
            )
          }
          </ul>
          <button 
            onClick={() => setRoundCategories()}
            className="btn btn-primary text-2xl w-2/5">
            Generate Categories
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
          <h1 className="text-3xl font-medium h-1/7">Roll for your letter!</h1>
          <div className="h-6/7">
            <Canvas id="numbers">
              <ambientLight intensity={Math.PI / 2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <LetterDie sendRoundLetter={setRoundLetter} />
            </Canvas>
          </div>
        </div>
      </div>
      <button 
        onClick={() => {
          setGameState(GameState.Active);
        }}
        disabled={roundCategories.length === 0 || roundLetter === ""}
        className={`btn btn-primary text-xl
          ${roundCategories.length === 0 || roundLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-indigo-300"}
          `}>
        Continue
      </button>
    </div>
  );
}

export default CategorySelection;